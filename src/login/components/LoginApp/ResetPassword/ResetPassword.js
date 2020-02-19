import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import ResetPasswordText from "./ResetPasswordText";
import GetEmailLink from "./GetEmailLink/GetEmailLink_container";
import EmailLinkSent from "./EmailLinkSent/EmailLinkSent_container";

class ResetPassword extends Component {
  render() {
    const url = this.props.history.location.pathname;
    let resetPasswordFunctionality = "";

    if (url.includes("get-email-link")) {
      resetPasswordFunctionality = [<GetEmailLink key="1" {...this.props} />];
    } else if (url.includes("email-link-sent")) {
      resetPasswordFunctionality = [<EmailLinkSent key="1" {...this.props} />];
    }

    console.log("these are props in the LoginForm:", this.props);
    return (
      <div className="text-margin">
        <ResetPasswordText key="0" {...this.props} />
        {resetPasswordFunctionality}
      </div>
    );
  }
}

ResetPassword.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(ResetPassword);
