import { authenticate } from "apis/eduidAuthn";
import NotificationModal from "components/Common/NotificationModal";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useNavigate } from "react-router-dom";
import authnSlice from "slices/Authn";
import { clearNotifications } from "slices/Notifications";

export function AuthenticateModal() {
  const dispatch = useAppDispatch();
  const re_authenticate = useAppSelector((state) => state.authn.re_authenticate);
  const frontend_action = useAppSelector((state) => state.authn.frontend_action);
  const frontend_state = useAppSelector((state) => state.authn.frontend_state);
  const [securityKeyDescription, setSecurityKeyDescription] = useState(null);
  const navigate = useNavigate();

  function isValidJson(jsonString: string) {
    try {
      JSON.parse(jsonString);
    } catch (e) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (frontend_state && isValidJson(frontend_state)) {
      const parsedFrontendState = JSON.parse(frontend_state);
      setSecurityKeyDescription(parsedFrontendState.description);
    }
  }, [frontend_state]);

  async function handleAuthenticate() {
    dispatch(authnSlice.actions.setReAuthenticate(false));
    dispatch(clearNotifications());
    const response = await dispatch(authenticate({ frontend_action: frontend_action, frontend_state: frontend_state }));

    if (authenticate.fulfilled.match(response)) {
      window.location.href = response?.payload.location;
    }
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
          {securityKeyDescription && (
            <p className="help-text">
              <FormattedMessage
                description="security zone modal"
                defaultMessage="Note: please use your security key {securityKeyDescription} during the login process."
                values={{
                  securityKeyDescription: <strong>{securityKeyDescription}</strong>,
                }}
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
