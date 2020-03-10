import React, { Component } from "react";
import PropTypes from "prop-types";

// to access redirect from LoginApp and for translation
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import { Route, Redirect } from "react-router-dom";

import ResetPasswordText from "./ResetPasswordText/ResetPasswordText";
import GetEmailLink from "./GetEmailLink/GetEmailLink_container";
import EmailLinkSent from "./EmailLinkSent/EmailLinkSent_container";
import GetConfirmationCode from "./GetConfirmationCode/GetConfirmationCode_container";
import UseConfirmationCode from "./UseConformationCode/UseConfirmationCode_container";
import SetNewPassword from "./SetNewPassword/SetNewPassword_container";

class ResetPassword extends Component {
  // if no user details (phone numebr or token) to confirm, users go straight to reset a new password
  checkUserDetails() {
    let redirectToPage = "";
    if (this.props.phone_numbers.length === 0 && this.props.security_keys) {
      redirectToPage = `set-new-password`;
    } else {
      redirectToPage = `get-confirmation-code`;
    }
    return (
      <Route
        exact
        path={`/reset/reset-password/check-user-details`}
        component={() => (
          <Redirect to={`/reset/reset-password/${redirectToPage}`} />
        )}
      />
    );
  }

  render() {
    console.log("these are props in the resetpassword:", this.props);
    console.log(
      "these are props in the resetpassword:",
      this.props.extra_security
    );
    const url = this.props.history.location.pathname;
    let resetPasswordFunc = "";

    if (url.includes("get-email-link")) {
      resetPasswordFunc = [<GetEmailLink key="1" {...this.props} />];
    } else if (url.includes("email-link-sent")) {
      resetPasswordFunc = [<EmailLinkSent key="1" {...this.props} />];
    } else if (url.includes("check-user-details")) {
      resetPasswordFunc = this.checkUserDetails();
    } else if (url.includes("get-confirmation-code")) {
      resetPasswordFunc = [<GetConfirmationCode key="1" {...this.props} />];
    } else if (url.includes("use-confirmation-code")) {
      resetPasswordFunc = [<UseConfirmationCode key="1" {...this.props} />];
    } else if (url.includes("set-new-password")) {
      resetPasswordFunc = [<SetNewPassword key="1" {...this.props} />];
    }

    return (
      <div className="text-margin">
        <ResetPasswordText key="0" {...this.props} />
        {resetPasswordFunc}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default InjectIntl(withRouter(ResetPassword));
