import { authnGetStatus } from "apis/eduidAuthn";
import { bankIDGetStatus } from "apis/eduidBankid";
import { GetStatusResponse, eidasGetStatus } from "apis/eduidEidas";
import { svipeGetStatus } from "apis/eduidSvipe";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        verifyIdentity: "/profile/verify-identity/",
        verifyCredential: "/profile/settings/advanced-settings/",
        changepwAuthn: "/profile/chpass",
        terminateAccountAuthn: "/",
        addSecurityKeyAuthn: "/profile/settings/advanced-settings/",
        removeSecurityKeyAuthn: "/profile/settings/advanced-settings/",
        changeSecurityPreferencesAuthn: "/profile/settings/advanced-settings/",
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
    const response = await dispatch(eidasGetStatus({ authn_id: authn_id }));
    if (eidasGetStatus.fulfilled.match(response)) {
      processStatus(response.payload);
    }
  }

  async function fetchSvipeStatus(authn_id: string) {
    const response = await dispatch(svipeGetStatus({ authn_id: authn_id }));
    if (svipeGetStatus.fulfilled.match(response)) {
      processStatus(response.payload);
    }
  }

  async function fetchBankIDStatus(authn_id: string) {
    const response = await dispatch(bankIDGetStatus({ authn_id: authn_id }));
    if (bankIDGetStatus.fulfilled.match(response)) {
      processStatus(response.payload);
    }
  }

  async function fetchAuthStatus(authn_id: string) {
    const response = await dispatch(authnGetStatus({ authn_id: authn_id }));
    if (authnGetStatus.fulfilled.match(response)) {
      processStatus(response.payload);
    }
  }

  useEffect(() => {
    if (params.authn_id && params.app_name === "eidas" && app_loaded) {
      fetchEidasStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "svipe_id") {
      fetchSvipeStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "bankid" && app_loaded) {
      fetchBankIDStatus(params.authn_id).catch(console.error);
    }
    if (params.authn_id && params.app_name === "authn" && app_loaded) {
      fetchAuthStatus(params.authn_id).catch(console.error);
    }
  }, [params, app_loaded]);

  return null;
}
