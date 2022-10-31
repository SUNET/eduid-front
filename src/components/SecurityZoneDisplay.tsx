import React, { useState } from "react";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

interface SecurityCenterDisplayProps {
  showModal?: boolean;
}

function SecurityCenterDisplay(props: SecurityCenterDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const config = useDashboardAppSelector((state) => state.config);

  function handleAcceptModal() {
    const chpassURL = config.token_service_url + "chpass";
    // the "chpass" path will route to the ChangePasswordContainer when we get back
    const nextURL = config.dashboard_url + "security-zone";
    const url = chpassURL + "?next=" + encodeURIComponent(nextURL);

    window.location.assign(url);
  }

  return (
    <article>
      <div id="change-password-container">
        <div className="intro">
          <h3>
            <FormattedMessage defaultMessage="Security zone" description="Dashboard security zone" />
          </h3>
          <p>
            <FormattedMessage
              defaultMessage="Click the link to enter security zone"
              description="Dashboard security zone"
            />
          </p>
        </div>
        <EduIDButton
          id="security-zone-button"
          buttonstyle="link"
          className="lowercase"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FormattedMessage defaultMessage="Security zone" description="Dashboard security zone button" />
        </EduIDButton>
      </div>

      <NotificationModal
        id="security-confirm-modal"
        title={
          <FormattedMessage defaultMessage="For security reasons..." description="Dashboard security center title" />
        }
        mainText={
          <FormattedMessage
            defaultMessage="You will need to log in again to enter security zone"
            description="Dashboard security zone main text"
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

export default SecurityCenterDisplay;
