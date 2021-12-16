import { fetchSuggestedPassword } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { translate } from "login/translation";
import React, { Fragment, useEffect } from "react";
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

  return (
    <Fragment>
      <div className="intro">
        <h4>{translate("chpass.main_title")}</h4>
      </div>
      <div id="changePasswordDialog">
        <ChangePasswordForm cancel_to="security" />
      </div>
    </Fragment>
  );
}

export const ChangePasswordContainer = ChangePassword;
