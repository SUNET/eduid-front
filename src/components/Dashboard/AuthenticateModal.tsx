import authnApi from "apis/eduidAuthn";
import { AuthMethod } from "apis/helpers/types";
import NotificationModal from "components/Common/NotificationModal";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useEffect, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router";
import authnSlice from "slices/Authn";
import { clearNotifications } from "slices/Notifications";

function isValidJson(jsonString: string): boolean {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

export function AuthenticateModal() {
  const dispatch = useAppDispatch();
  const re_authenticate = useAppSelector((state) => state.authn.re_authenticate);
  const frontend_action = useAppSelector((state) => state.authn.frontend_action);
  const frontend_state = useAppSelector((state) => state.authn.frontend_state);
  const navigate = useNavigate();
  const [call_authenticate, { data, isError, isLoading }] = authnApi.useLazyAuthenticateQuery();

  // Parse frontend_state to extract description and method
  const { securityKeyDescription, method } = useMemo<{
    securityKeyDescription: string | null;
    method: AuthMethod | "";
  }>(() => {
    if (frontend_state && isValidJson(frontend_state)) {
      const parsedFrontendState = JSON.parse(frontend_state);
      return {
        securityKeyDescription: parsedFrontendState.description || null,
        method: parsedFrontendState.method || "",
      };
    }
    return { securityKeyDescription: null, method: "" };
  }, [frontend_state]);

  useEffect(() => {
    if (data?.payload?.location && !isLoading && !isError) {
      window.location.href = data.payload.location;
    }
  }, [data, isError, isLoading]);

  function handleAuthenticate() {
    dispatch(authnSlice.actions.setReAuthenticate(false));
    dispatch(clearNotifications());
    call_authenticate({ frontend_action: frontend_action, frontend_state: frontend_state });
  }

  function handleCloseModal() {
    // navigate to account when user cancel re-authentication
    if (frontend_action === "changepwAuthn" && re_authenticate) {
      navigate("profile/account/");
    }
    dispatch(authnSlice.actions.setAuthnFrontendReset());
    dispatch(authnSlice.actions.setReAuthenticate(false));
  }

  return (
    <NotificationModal
      id="security-confirm-modal"
      title={<FormattedMessage defaultMessage="Security check" description="Dashboard change password modal title" />}
      mainText={
        <Fragment>
          <FormattedMessage
            description="security zone modal"
            defaultMessage="You need to log in again to perform the requested action."
          />
          <br />
          {frontend_action === "verifyCredential" && (
            <p className="help-text">
              <FormattedMessage
                description="security zone modal"
                defaultMessage="Note: please use your security key {securityKeyDescription} during the login process. "
                values={{
                  securityKeyDescription: <strong>{securityKeyDescription}</strong>,
                }}
              />
              &nbsp;
              <FormattedMessage
                description="security zone modal"
                defaultMessage=" After logging in, you will be redirected to {externalPage} page to verify your security key."
                values={{
                  securityKeyDescription: <strong>{securityKeyDescription}</strong>,
                  externalPage: <strong>{method ? method.replace("_eid", "").toUpperCase() : "External"}</strong>,
                }}
              />
            </p>
          )}
          {frontend_action === "removeSecurityKeyAuthn" && (
            <p className="help-text">
              <FormattedMessage
                description="security zone modal"
                defaultMessage="Note: Your security key {securityKeyDescription} will be removed after you log in."
                values={{
                  securityKeyDescription: <strong>{securityKeyDescription}</strong>,
                }}
              />
            </p>
          )}
          {frontend_action === "removeIdentity" && (
            <p className="help-text">
              <FormattedMessage
                description="security zone modal"
                defaultMessage="Note: continuing will disconnect your real identity from your eduID after you log in."
              />
            </p>
          )}
          {frontend_action === "addSecurityKeyAuthn" && (
            <p className="help-text">
              <FormattedMessage
                description="security zone modal"
                defaultMessage="Note: After logging in, you'll be asked to enter a name for your security key."
              />
            </p>
          )}
        </Fragment>
      }
      showModal={re_authenticate}
      closeModal={handleCloseModal}
      acceptModal={handleAuthenticate}
      acceptButtonText={<FormattedMessage defaultMessage="Continue" description="continue button" />}
    />
  );
}
