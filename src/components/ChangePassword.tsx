import { fetchSuggestedPassword } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import ChangePasswordForm from "./ChangePasswordForm";

function ChangePassword() {
  const suggested_password = useDashboardAppSelector((state) => state.chpass.suggested_password);
  const is_app_loaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    if (is_app_loaded && suggested_password === undefined) {
      // call fetchSuggestedPassword once state.config.security_url is initialised
      dispatch(fetchSuggestedPassword());
    }
  }, [suggested_password, is_app_loaded]);

  // TODO: Remove ids from FormattedMessage later, when it won't cause a lot of red warnings in the console log
  //       before this is merged after the holidays.
  return (
    <React.Fragment>
      <div className="intro">
        <h4>
          <FormattedMessage
            id="chpass.main_title"
            defaultMessage="Change your current password"
            description="Dashboard change password"
          />
        </h4>
      </div>
      <div id="changePasswordDialog">
        <ChangePasswordForm finish_url="security" />
      </div>
    </React.Fragment>
  );
}

export const ChangePasswordContainer = ChangePassword;
