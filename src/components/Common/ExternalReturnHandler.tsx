import authnApi from "apis/eduidAuthn";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, GetStatusResponse } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import { IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { showNotification } from "slices/Notifications";

// URL parameters passed to this component
interface LoginParams {
  app_name?: string;
  authn_id?: string;
}

export function ExternalReturnHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as LoginParams;
  const app_loaded = useAppSelector((state) => state.config.is_app_loaded);
  const [authnGetStatus_trigger, authnGetStatus] = authnApi.useLazyAuthnGetStatusQuery();
  const [bankIDGetStatus_trigger] = bankIDApi.useLazyBankIDGetStatusQuery();
  const [eidasGetStatus_trigger] = eidasApi.useLazyEidasGetStatusQuery();
  const [frejaeIDGetStatus_trigger] = frejaeIDApi.useLazyFrejaeIDGetStatusQuery();

  function processStatus(response: GetStatusResponse) {
    const status = response;
    // Status has been fetched
    if (status.status) {
      dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
    }
    if (status.frontend_action) {
      // actionToRoute is a mapping from frontend_action values to where in the Dashboard application
      // the user should be returned to
      const actionToRoute: { [key: string]: string } = {
        verifyIdentity: IDENTITY_PATH,
        verifyCredential: SECURITY_PATH,
        changepwAuthn: "/profile/chpass",
        terminateAccountAuthn: "/",
        addSecurityKeyAuthn: SECURITY_PATH,
        removeSecurityKeyAuthn: SECURITY_PATH,
        changeSecurityPreferencesAuthn: SECURITY_PATH,
        removeIdentity: IDENTITY_PATH,
      };
      const _path = actionToRoute[status.frontend_action];
      if (_path) {
        navigate(_path);
        return;
      }
    }

    navigate("/profile/"); // GOTO start
  }

  async function fetchEidasStatus(authn_id: string) {
    const response = await eidasGetStatus_trigger({ authn_id: authn_id });
    if (response.isSuccess) {
      processStatus(response.data.payload);
    }
  }

  async function fetchFrejaeIDStatus(authn_id: string) {
    const response = await frejaeIDGetStatus_trigger({ authn_id: authn_id });
    if (response.isSuccess) {
      processStatus(response.data.payload);
    }
  }

  async function fetchBankIDStatus(authn_id: string) {
    const response = await bankIDGetStatus_trigger({ authn_id: authn_id });
    if (response.isSuccess) {
      processStatus(response.data.payload);
    }
  }

  useEffect(() => {
    if (authnGetStatus.data && !authnGetStatus.isError && !authnGetStatus.isLoading) {
      processStatus(authnGetStatus.data.payload)
    }
  }, [authnGetStatus.data, authnGetStatus.isError, authnGetStatus.isLoading])

  useEffect(() => {
    if (params.authn_id && params.app_name === "eidas" && app_loaded) {
      fetchEidasStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "freja_eid") {
      fetchFrejaeIDStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "bankid" && app_loaded) {
      fetchBankIDStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "authn" && app_loaded) {
      authnGetStatus_trigger({ authn_id: params.authn_id });
    }
  }, [params, app_loaded]);

  return null;
}
