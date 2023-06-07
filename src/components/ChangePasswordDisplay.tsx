import { authnAuthenticate } from "apis/eduidAuthn";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

interface ChangePasswordDisplayProps {
  showModal?: boolean;
}

function ChangePasswordDisplay(props: ChangePasswordDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const dispatch = useDashboardAppDispatch();

  async function handleAcceptModal() {
    const authn = await dispatch(
      authnAuthenticate({
        method: "authenticate",
        frontend_action: "changePassword",
        frontend_state: window.location.pathname,
        same_user: true,
        force_authn: true,
      })
    );
    if (authnAuthenticate.fulfilled.match(authn)) {
      if (authn.payload.location) {
        window.location.assign(authn.payload.location);
      }
    }
  }

  return (
    <article>
      <div id="change-password-container">
        <h2>
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="Click the link to change your eduID password."
            description="Dashboard change password link description text"
          />
        </p>
        <EduIDButton
          id="security-change-button"
          buttonstyle="link"
          className="lowercase"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FormattedMessage defaultMessage="Change password" description="Dashboard change password button text" />
        </EduIDButton>
      </div>

      <NotificationModal
        id="security-confirm-modal"
        title={
          <FormattedMessage
            defaultMessage="For security reasons..."
            description="Dashboard change password modal title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage="You will need to log in again to change your password."
            description="Dashboard change password modal main text"
          />
        }
        showModal={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
        acceptModal={handleAcceptModal}
        acceptButtonText={<FormattedMessage defaultMessage="Accept" description="accept button" />}
      />
    </article>
  );
}

export default ChangePasswordDisplay;
