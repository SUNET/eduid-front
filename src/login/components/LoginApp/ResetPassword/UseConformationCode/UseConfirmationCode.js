import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

import ConfirmationCodeInput from "../../../Inputs/ConfirmationCodeInput";
import PrimaryButton from "../../../Buttons/ButtonPrimary";
import SecondaryButton from "../../../Buttons/ButtonSecondary";
import Link from "../../../Links/Link";
// import ButtonRedirect from "../../ButtonPrimary";

import { validate } from "../../../../app_utils/validation/validateEmail";

let ConfirmationCodeForm = props => (
  // console.log("this is props in Email Form", props),
  <form id="reset-password-email-form" className="form">
    <ConfirmationCodeInput {...props} />
    <PrimaryButton
      // className={"settings-button"}
      id={"use-confirmation-code"}
      disabled={props.invalid}
      onClick={props.handleUseConfirmationCode}
    >
      I got the code
    </PrimaryButton>
  </form>
);

ConfirmationCodeForm = reduxForm({
  form: "confirmation-code-form",
  validate
})(ConfirmationCodeForm);

ConfirmationCodeForm = connect(state => ({
  enableReinitialize: true
}))(ConfirmationCodeForm);

class UseConfirmationCode extends Component {
  render() {
    // console.log("this is props in GetEmailLink", this.props);
    return (
      <React.Fragment>
        <ConfirmationCodeForm {...this.props} />
        <p>
          <span className="sub-heading"> No code to your phone?</span>
          <p>Request another one here. It is valid for up to two hours.</p>
        </p>
        <SecondaryButton
          id={"use-confirmation-code"}
          onClick={this.handleResendConfirmationCode}
        >
          Send a new code
        </SecondaryButton>
      </React.Fragment>
    );
  }
}

UseConfirmationCode.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(UseConfirmationCode);
