import { bankIDGetStatus } from "apis/eduidBankid";
import { eidasGetStatus } from "apis/eduidEidas";
import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "slices/Notifications";

// URL parameters passed to this component
interface LoginParams {
  app_name?: string;
  authn_id?: string;
}

// These match config (frontend_action_finish_url in eduid-eidas) in the backend and are used to
// get back to where the user was before starting the external authentication process.
//export type LoginEidasFrontendAction = "loginMfaAuthn";

export function LoginExternalReturnHandler() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams() as LoginParams;
  const is_configured = useAppSelector((state) => state.config.is_configured);

  async function fetchStatus(authn_id: string) {
    const getStatusAction = params.app_name === "eidas" ? eidasGetStatus : bankIDGetStatus;

    const response = await dispatch(getStatusAction({ authn_id: authn_id }));
    if (getStatusAction.fulfilled.match(response)) {
      const status = response.payload;
      if (status?.method) {
        // Status has been fetched

        if (status.status) {
          dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
        }

        if (status.frontend_action) {
          // actionToRoute is a mapping from frontend_action values to where in the Login/ResetPW application
          // the user should be returned to
          const actionToRoute: { [key: string]: string } = {
            loginMfaAuthn: `/login/${status.frontend_state}`,
            resetpwMfaAuthn: `/reset-password/`,
          };
          if (!status.error && status.frontend_action === "resetpwMfaAuthn" && status.frontend_state) {
            dispatch(verifyEmailLink({ email_code: status.frontend_state }));
          }
          const _path = actionToRoute[status.frontend_action];
          if (_path) {
            navigate(_path);
            return;
          }
        }

        // TODO: Navigate to errors page here
        navigate("/login/"); // GOTO start
      }
    }
  }

  useEffect(() => {
    // have to wait for the app to be loaded (jsconfig completed) before we can fetch the status
    if (params.authn_id && is_configured) {
      fetchStatus(params.authn_id);
    }
  }, [params, is_configured]);

  return null;
}
