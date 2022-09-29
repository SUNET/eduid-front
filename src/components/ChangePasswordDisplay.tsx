import { initiatePasswordChange } from "actions/Security";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

interface ChangePasswordDisplayProps {
  showModal?: boolean;
}

function ChangePasswordDisplay(props: ChangePasswordDisplayProps) {
  const [showModal, setShowModal] = useState<boolean>(props.showModal === true);
  const dispatch = useDashboardAppDispatch();

  function handleAcceptModal() {
    dispatch(initiatePasswordChange());
  }

  function openModal() {
    setShowModal(true);
  }

  // TODO: Remove ids from FormattedMessage later, when it won't cause a lot of red warnings in the console log
  //       before this is merged after the holidays.
  return (
    <article>
      <div id="change-password-container">
        <div className="intro">
          <h3>
            <FormattedMessage
              id="settings.main_title"
              defaultMessage="Change password"
              description="Dashboard change password"
            />
          </h3>
          <p>
            <FormattedMessage
              id="settings.long_description"
              defaultMessage="Click the link to change your eduID password."
              description="Dashboard change password"
            />
          </p>
        </div>
        <EduIDButton id="security-change-button" buttonstyle="link" className="lowercase" onClick={openModal}>
          <FormattedMessage
            id="settings.change_password"
            defaultMessage="Change password"
            description="Dashboard change password"
          />
        </EduIDButton>
      </div>

      <NotificationModal
        id="security-confirm-modal"
        title={
          <FormattedMessage
            id="settings.confirm_title_chpass"
            defaultMessage="For security reasons..."
            description="Dashboard change password"
          />
        }
        mainText={
          <FormattedMessage
            id="settings.change_info"
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
