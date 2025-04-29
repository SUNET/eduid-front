import { authnGetStatus } from "apis/eduidAuthn";
import { bankIDGetStatus } from "apis/eduidBankid";
import { eidasGetStatus } from "apis/eduidEidas";
import { verifyEmailLink } from "apis/eduidResetPassword";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { LOCALIZED_MESSAGES } from "globals";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import personalDataApi from "services/personalData";
import { appLoadingSlice } from "slices/AppLoading";
import { updateIntl } from "slices/Internationalisation";
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
  const [personal_data_refetch, personalData] = personalDataApi.useLazyRequestAllPersonalDataQuery()

  async function fetchStatus(authn_id: string) {
    let getStatusAction;

    if (params.app_name === "eidas") {
      getStatusAction = eidasGetStatus;
    } else if (params.app_name === "bankid") {
      getStatusAction = bankIDGetStatus;
    } else {
      getStatusAction = authnGetStatus;
    }
    const response = await dispatch(getStatusAction({ authn_id: authn_id }));
    if (getStatusAction.fulfilled.match(response)) {
      const status = response.payload;

      if (status.status) {
        dispatch(showNotification({ message: status.status, level: status.error ? "error" : "info" }));
      }

      if (status.frontend_action) {
        // actionToRoute is a mapping from frontend_action values to where in the Login/ResetPW application
        // the user should be returned to
        const actionToRoute: { [key: string]: string } = {
          loginMfaAuthn: `/login/${status.frontend_state}`,
          resetpwMfaAuthn: `/reset-password/`,
          login: "/profile/",
        };
        if (!status.error && status.frontend_action === "resetpwMfaAuthn" && status.frontend_state) {
          dispatch(verifyEmailLink({ email_code: status.frontend_state }));
        }
        if (!status.error && status.frontend_action === "login") {
          personal_data_refetch();
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

  useEffect(() => {
    if (personalData.data && !personalData.isLoading && !personalData.isError) {
      if (personalData.data.payload.language) {
        dispatch(
          updateIntl({
            locale: personalData.data.payload.language,
            messages: LOCALIZED_MESSAGES[personalData.data.payload.language],
          })
        );
      }
      dispatch(appLoadingSlice.actions.appLoaded());
    }
  }, [personalData.data, personalData.isLoading, personalData.isError])

  useEffect(() => {
    // have to wait for the app to be loaded (jsconfig completed) before we can fetch the status
    if (params.authn_id && is_configured) {
      fetchStatus(params.authn_id);
    }
  }, [params, is_configured]);

  return null;
}
