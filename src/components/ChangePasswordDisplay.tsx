import { eduidRMAllNotify } from "actions/Notifications";
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword } from "actions/Security";
import EduIDButton from "components/EduIDButton";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import React from "react";
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

  return (
    <div>
      <div id="change-password-container">
        <div className="intro">
          <h4>{translate("settings.main_title")} </h4>
          <p>{translate("settings.long_description")}</p>
        </div>
        <div id="change-password">
          <EduIDButton id="security-change-button" className="btn-link" onClick={handleStartConfirmationPassword}>
            {translate("settings.change_password")}
          </EduIDButton>
        </div>
      </div>
      <NotificationModal
        modalId="securityConfirmDialog"
        title={translate("settings.confirm_title_chpass")}
        mainText={translate("settings.change_info")}
        showModal={confirming_change}
        closeModal={handleStopConfirmationPassword}
        acceptModal={handleConfirmationPassword}
      />
    </div>
  );
}

export default ChangePasswordDisplay;
