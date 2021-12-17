import { eduidRMAllNotify } from "actions/Notifications";
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword } from "actions/Security";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React from "react";
import { FormattedMessage } from "react-intl";
import NotificationModal from "../login/components/Modals/NotificationModal";

function ChangePasswordDisplay() {
  const confirming_change = useDashboardAppSelector((state) => state.security.confirming_change);
  const dispatch = useDashboardAppDispatch();

  function handleStartConfirmationPassword() {
    dispatch(eduidRMAllNotify());
    // TODO: This action sets state.security.confirming_change to true, which shows the securityConfirmDialog modal
    //       below. I think we can replace this with a simple useState() in this component.
    dispatch(startConfirmationPassword());
  }
  function handleStopConfirmationPassword() {
    dispatch(stopConfirmationPassword());
  }
  function handleConfirmationPassword() {
    dispatch(confirmPasswordChange());
  }

  // TODO: Remove ids from FormattedMessage later, when it won't cause a lot of red warnings in the console log
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
          <EduIDButton id="security-change-button" className="btn-link" onClick={handleStartConfirmationPassword}>
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
        showModal={confirming_change}
        closeModal={handleStopConfirmationPassword}
        acceptModal={handleConfirmationPassword}
      />
    </div>
  );
}

export default ChangePasswordDisplay;
