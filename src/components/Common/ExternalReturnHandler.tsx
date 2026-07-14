import authnApi from "apis/eduidAuthn";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, GetStatusResponse } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import { orcidApi } from "apis/eduidOrcid";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { ACCOUNT_PATH, CHPASS_BASE_PATH, IDENTITY_PATH, SECURITY_PATH, START_PATH } from "helperFunctions/paths";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { showNotification } from "slices/Notifications";

interface LoginParams {
  app_name?: string;
  authn_id?: string;
}

const actionToRoute: { [key: string]: string } = {
  verifyIdentity: IDENTITY_PATH,
  verifyCredential: SECURITY_PATH,
  changepwAuthn: CHPASS_BASE_PATH,
  terminateAccountAuthn: "/",
  addSecurityKeyAuthn: SECURITY_PATH,
  removeSecurityKeyAuthn: SECURITY_PATH,
  changeSecurityPreferencesAuthn: SECURITY_PATH,
  removeIdentity: IDENTITY_PATH,
  connectOrcid: ACCOUNT_PATH,
};

function getRoute(frontend_action: string): string {
  return actionToRoute[frontend_action] ?? START_PATH;
}

export function ExternalReturnHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as LoginParams;
  const app_loaded = useAppSelector((state) => state.config.is_app_loaded);
  const [authnGetStatus] = authnApi.useLazyAuthnGetStatusQuery();
  const [bankIDGetStatus] = bankIDApi.useLazyBankIDGetStatusQuery();
  const [eidasGetStatus] = eidasApi.useLazyEidasGetStatusQuery();
  const [frejaeIDGetStatus] = frejaeIDApi.useLazyFrejaeIDGetStatusQuery();
  const [orcidGetStatus] = orcidApi.useLazyOrcidGetStatusQuery();

  const getStatusAction = useCallback(
    (app_name: string | undefined) => {
      const actions: Record<string, typeof authnGetStatus> = {
        eidas: eidasGetStatus,
        bankid: bankIDGetStatus,
        freja_eid: frejaeIDGetStatus,
        orcid: orcidGetStatus,
      };
      return actions[app_name ?? ""] ?? authnGetStatus;
    },
    [eidasGetStatus, bankIDGetStatus, frejaeIDGetStatus, orcidGetStatus, authnGetStatus],
  );

  const processStatus = useCallback(
    (status: GetStatusResponse) => {
      if (status.status) {
        dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
      }
      navigate(status.frontend_action ? getRoute(status.frontend_action) : START_PATH);
    },
    [dispatch, navigate],
  );

  const fetchStatus = useCallback(
    async (authn_id: string) => {
      const action = getStatusAction(params.app_name);
      const response = await action({ authn_id });
      if (response.isSuccess) {
        processStatus(response.data.payload as GetStatusResponse);
      }
    },
    [params.app_name, getStatusAction, processStatus],
  );

  useEffect(() => {
    if (app_loaded && params.authn_id) {
      fetchStatus(params.authn_id);
    }
  }, [params, app_loaded, fetchStatus]);

  return null;
}
