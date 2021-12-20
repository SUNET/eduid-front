import { initiatePasswordChange } from "actions/Security";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch } from "dashboard-hooks";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

function ChangePasswordDisplay() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDashboardAppDispatch();

  function handleAcceptModal() {
    dispatch(initiatePasswordChange());
  }

  // TODO: Remove ids from FormattedMessage later, when it won't cause a lot of red warnings in the console log
  //       before this is merged after the holidays.
  return (
    <div>
      <div id="change-password-container">
        <div className="intro">
          <h4>
            <FormattedMessage
              id="settings.main_title"
              defaultMessage="Change password"
              description="Dashboard change password"
            />
          </h4>
          <p>
            <FormattedMessage
              id="settings.long_description"
              defaultMessage="Click the link to change your eduID password."
              description="Dashboard change password"
            />
          </p>
        </div>
        <div id="change-password">
          <EduIDButton
            id="security-change-button"
            className="btn-link"
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
      </div>

      <NotificationModal
        modalId="securityConfirmDialog"
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
      />
    </div>
  );
}

export default ChangePasswordDisplay;
