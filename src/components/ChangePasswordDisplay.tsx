import EduIDButton from "components/EduIDButton";
import { useDashboardAppSelector } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

interface ChangePasswordDisplayProps {
  showModal?: boolean;
}

function ChangePasswordDisplay(props: ChangePasswordDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const config = useDashboardAppSelector((state) => state.config);

  function handleAcceptModal() {
    const chpassURL = config.token_service_url + "chpass";
    // the "chpass" path will route to the ChangePasswordContainer when we get back
    const nextURL = config.dashboard_url + "chpass";
    const url = chpassURL + "?next=" + encodeURIComponent(nextURL);

    window.location.assign(url);
  }

  return (
    <article>
      <div id="change-password-container">
        <div className="intro">
          <h3>
            <FormattedMessage defaultMessage="Change password" description="Dashboard change password" />
          </h3>
          <p>
            <FormattedMessage
              defaultMessage="Click the link to change your eduID password."
              description="Dashboard change password"
            />
          </p>
        </div>
        <EduIDButton
          id="security-change-button"
          buttonstyle="link"
          className="lowercase"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FormattedMessage
            id="settings.change_password"
            defaultMessage="Change password"
            description="Dashboard change password"
          />
        </EduIDButton>
      </div>

      <NotificationModal
        id="security-confirm-modal"
        title={<FormattedMessage defaultMessage="For security reasons..." description="Dashboard change password" />}
        mainText={
          <FormattedMessage
            defaultMessage="You will need to log in again to change your password."
            description="Dashboard change password"
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
