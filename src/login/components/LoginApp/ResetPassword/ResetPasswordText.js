import React, { Component } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
class ResetPasswordText extends Component {
  render() {
    // console.log("this is props in ResetPasswordText:", this.props )
    const url = this.props.history.location.pathname;
    let heading = "";
    let text = "";
    let instructions = "";
    if (url.includes("get-email-link")) {
      heading = this.props.translate("resetpw.get-email-link_heading");
      text = this.props.translate("resetpw.get-email-link_text");
    } else if (url.includes("email-link-sent")) {
      heading = this.props.translate("resetpw.email-link-sent_heading");
      text = this.props.translate("resetpw.email-link-sent_text");
    } else if (url.includes("get-confirmation-code")) {
      heading = "Prove that you are the owner of your eduID with your phone.";
      text =
        "By proving that you have access to the phone number added to your eduID your password will be reset without resetting your verified identity.";
      instructions =
        "1. Recieve a code to your phone 2. Use the code to prove you have access to the phone";
    } else if (url.includes("use-confirmation-code")) {
      heading = "Use the code to prove that you are the owner of this eduID.";
      text =
        "Enter the confirmation code to prove you have access to the phone number. By doing so, you will be able to access your existing eduID.";
    } else if (url.includes("new-password")) {
      heading = "Set your new password.";
    }

    // console.log("these are props in the ResetPasswordText:", this.props);

    return (
      <div className="text-container">
        <p className="sub-heading">{heading}</p>
        <p>{text}</p>
        <p className="instructions">{instructions}</p>
      </div>
    );
  }
}

ResetPasswordText.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default InjectIntl(ResetPasswordText);;

