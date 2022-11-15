import { eidasGetStatus } from "apis/eduidEidas";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showNotification } from "reducers/Notifications";

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
  const app_loaded = useAppSelector((state) => state.app.is_loaded);

  async function fetchStatus(authn_id: string) {
    const response = await dispatch(eidasGetStatus({ authn_id: authn_id }));
    if (eidasGetStatus.fulfilled.match(response)) {
      const status = response.payload;
      if (status?.method) {
        // Status has been fetched

        if (status.status) {
          dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
        }

        if (status.frontend_action) {
          // actionToRoute is a mapping from frontend_action values to where in the Login application
          // the user should be returned to
          const actionToRoute: { [key: string]: string } = {
            loginMfaAuthn: `/login/${status.frontend_state}`,
            resetpwMfaAuthn: `/reset-password/extra-security/${status.frontend_state}`,
          };

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
    if (params.authn_id && app_loaded) {
      fetchStatus(params.authn_id);
    }
  }, [params, app_loaded]);

  return null;
}
