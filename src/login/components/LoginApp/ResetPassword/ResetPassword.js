import React, { Component } from "react";
import PropTypes from "prop-types";

// to access redirect from LoginApp and for translation
import { withRouter } from "react-router-dom";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

import ResetPasswordText from "./ResetPasswordText/ResetPasswordText";
import GetEmailLink from "./GetEmailLink/GetEmailLink_container";
import EmailLinkSent from "./EmailLinkSent/EmailLinkSent_container";
import GetConfirmationCode from "./GetConfirmationCode/GetConfirmationCode_container";
import UseConfirmationCode from "./UseConformationCode/UseConfirmationCode_container";

class ResetPassword extends Component {
  render() {
    const url = this.props.history.location.pathname;
    let resetPasswordFunctionality = "";

    if (url.includes("get-email-link")) {
      resetPasswordFunctionality = [<GetEmailLink key="1" {...this.props} />];
    } else if (url.includes("email-link-sent")) {
      resetPasswordFunctionality = [<EmailLinkSent key="1" {...this.props} />];
    } else if (url.includes("get-confirmation-code")) {
      resetPasswordFunctionality = [
        <GetConfirmationCode key="1" {...this.props} />
      ];
    } else if (url.includes("use-confirmation-code")) {
      resetPasswordFunctionality = [
        <UseConfirmationCode key="1" {...this.props} />
      ];
    }

    // console.log("these are props in the resetpassword:", this.props);
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

export default InjectIntl(withRouter(ResetPassword));
