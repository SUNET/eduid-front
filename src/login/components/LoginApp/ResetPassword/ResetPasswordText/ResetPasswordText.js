import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import InjectIntl from "../../../../translation/InjectIntl_HOC_factory";
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
      let instructionSteps = [
        "1. Recieve a code to your phone",
        "2. Use the code to prove you have access to the phone",
      ];
      instructions = instructionSteps.map((instruction, i) => {
        return (
          <p key={i} className="steps">
            {instruction}
          </p>
        );
      });
    } else if (url.includes("use-confirmation-code")) {
      heading = "Use the code to prove that you are the owner of this eduID.";
      text =
        "By proving that you got the code you get to keep your eduID identity intact even after the password reset.";
    } else if (url.includes("set-new-password")) {
      heading = "Set your new password";
    }

    // console.log("these are props in the ResetPasswordText:", this.props);

    return (
      // <div className="text-container">
      <Fragment>
        <p key="0" className="heading">
          {heading}
        </p>
        <p key="1">{text}</p>
        <div key="2" className="instructions-container">
          {instructions}
        </div>
      </Fragment>
      // </div>
    );
  }
}

ResetPasswordText.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

export default InjectIntl(ResetPasswordText);
