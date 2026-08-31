import authnApi from "apis/eduidAuthn";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, GetStatusResponse } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import personalDataApi from "apis/eduidPersonalData";
import { resetPasswordApi } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { LOCALIZED_MESSAGES } from "globals";
import { LOGIN_BASE_PATH } from "helperFunctions/paths";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import indexSlice from "slices/IndexConfig";
import { updateIntl } from "slices/Internationalisation";
import { showNotification } from "slices/Notifications";

interface LoginParams {
  app_name?: string;
  authn_id?: string;
}

const actionToRoute: { [key: string]: string } = {
  loginMfaAuthn: "/login/",
  resetpwMfaAuthn: "/reset-password/",
  login: "/start",
};

function getRoute(frontend_action: string, frontend_state?: string): string | undefined {
  if (frontend_action === "loginMfaAuthn" && frontend_state) {
    return `/login/${frontend_state}`;
  }
  return actionToRoute[frontend_action];
}

export function LoginExternalReturnHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as LoginParams;
  const is_configured = useAppSelector((state) => state.config.is_configured);
  const [requestAllPersonalData] = personalDataApi.useLazyRequestAllPersonalDataQuery();
  const [authnGetStatus] = authnApi.useLazyAuthnGetStatusQuery();
  const [bankIDGetStatus] = bankIDApi.useLazyBankIDGetStatusQuery();
  const [eidasGetStatus] = eidasApi.useLazyEidasGetStatusQuery();
  const [frejaeIDGetStatus] = frejaeIDApi.useLazyFrejaeIDGetStatusQuery();
  const [verifyEmailLink] = resetPasswordApi.useLazyVerifyEmailLinkQuery();

  const handleResetPassword = useCallback(
    (status: GetStatusResponse) => {
      if (!status.error && status.frontend_state) {
        verifyEmailLink({ email_code: status.frontend_state });
      }
    },
    [verifyEmailLink],
  );

  const handleLogin = useCallback(async () => {
    const response = await requestAllPersonalData();
    if (response.isSuccess && response.data.payload.language) {
      dispatch(
        updateIntl({
          locale: response.data.payload.language,
          messages: LOCALIZED_MESSAGES[response.data.payload.language],
        }),
      );
    }
    dispatch(indexSlice.actions.appLoaded());
  }, [requestAllPersonalData, dispatch]);

  const processStatus = useCallback(
    async (status: GetStatusResponse) => {
      if (status.status) {
        dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
      }

      if (!status.frontend_action) {
        navigate(LOGIN_BASE_PATH);
        return;
      }

      if (!status.error && status.frontend_action === "resetpwMfaAuthn") {
        handleResetPassword(status);
      }

      if (!status.error && status.frontend_action === "login") {
        await handleLogin();
      }

      const _path = getRoute(status.frontend_action, status.frontend_state);
      if (_path) {
        navigate(_path);
        return;
      }

      navigate(LOGIN_BASE_PATH);
    },
    [dispatch, navigate, handleResetPassword, handleLogin],
  );

  const fetchStatus = useCallback(
    async (authn_id: string) => {
      let getStatusAction;

      if (params.app_name === "eidas" || params.app_name === "samleid") {
        // samleid replaces eidas/bankid; eidas_service_url/bankid_service_url in config already
        // point at the samleid host, so the existing eidasGetStatus hook resolves correctly.
        getStatusAction = eidasGetStatus;
      } else if (params.app_name === "bankid") {
        getStatusAction = bankIDGetStatus;
      } else if (params.app_name === "freja_eid") {
        getStatusAction = frejaeIDGetStatus;
      } else {
        getStatusAction = authnGetStatus;
      }

      const response = await getStatusAction({ authn_id });
      if (response.isSuccess) {
        await processStatus(response.data.payload);
      }
    },
    [params.app_name, eidasGetStatus, bankIDGetStatus, frejaeIDGetStatus, authnGetStatus, processStatus],
  );

  useEffect(() => {
    if (params.authn_id && is_configured) {
      fetchStatus(params.authn_id);
    }
  }, [params, is_configured, fetchStatus]);

  return null;
}
