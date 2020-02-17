import React, { Component } from "react";
import PropTypes from "prop-types";

import ResetPasswordText from "../ResetPasswordText";
import ResetPasswordEmailLink from "../ResetPasswordEmailLink";

class ResetPassword extends Component {
  render() {
    const url = this.props.history.location.pathname;
    let resetPasswordFunctionality = "";
    
    if (url.includes("get-email-link")) {
      resetPasswordFunctionality = [<ResetPasswordEmailLink {...this.props} />];
    } 

    console.log("these are props in the LoginForm:", this.props);
    return (
      <div className="text-margin">
        <ResetPasswordText {...this.props} />
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

export default ResetPassword;
