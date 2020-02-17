import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Input from "../Input";
import Link from "../Link";
import ButtonPrimary from "../ButtonPrimary";

import { validate } from "../../app_utils/validation/validateEmail";

let FormDetails = props => (
  <React.Fragment>
    <Field
      type={"email"}
      name={"email"}
      label={"email address"}
      inputclass={"input"}
      id={"email-input"}
      component={Input}
      l10n={props.l10n}
      placeholder={"example@email.com"}
    />
    <div className="form-button-pair">
      <ButtonPrimary
        className={"settings-button"}
        id={"register-button"}
        disabled={props.invalid}
        onClick={props.handleLogin}
      >
        Send me a link
      </ButtonPrimary>
      {/* <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback> */}
    </div>
  </React.Fragment>
  // )
);

FormDetails = reduxForm({
  form: "email-form",
  validate
})(FormDetails);

FormDetails = connect(state => ({
  enableReinitialize: true
}))(FormDetails);

class ResetPassword extends Component {
  render() {
    console.log("these are props in the LoginForm:", this.props);
    return (
      <div className="text-margin">
        <p className="sub-heading">
          Request a password reset link to your email address.
        </p>
        <p>
          Enter the email address registered to your eduID. You will be sent a
          link to reset your password.
        </p>
        <form id="login-form" className="form">
          <FormDetails {...this.props} />
        </form>
        <p>
          <span className="sub-heading">For your security:</span> You may be
          asked to prove that you are the owner of your eduID before resetting
          the password.
        </p>
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
