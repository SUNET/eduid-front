import { fetchSuggestedPassword } from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import ChangePasswordForm from "./ChangePasswordForm";

// exported for use in tests
export const finish_url = "/profile/security";

function ChangePassword() {
  const suggested_password = useAppSelector((state) => state.chpass.suggested_password);
  const is_app_loaded = useAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useAppDispatch();
  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Change Password",
      defaultMessage: "Change Password | eduID",
    });
  }, []);

  useEffect(() => {
    if (is_app_loaded && suggested_password === undefined) {
      // call fetchSuggestedPassword once state.config.security_service_url is initialised
      dispatch(fetchSuggestedPassword());
    }
  }, [suggested_password, is_app_loaded]);

  return (
    <React.Fragment>
      <h4>
        <FormattedMessage defaultMessage="Change your current password" description="Dashboard change password" />
      </h4>
      <div id="changePasswordDialog">
        <ChangePasswordForm finish_url={finish_url} />
      </div>
    </React.Fragment>
  );
}

export const ChangePasswordContainer = ChangePassword;
