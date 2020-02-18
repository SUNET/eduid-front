import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import EmailInput from "./EmailInput";
import ButtonPrimary from "./ButtonPrimary";

import { validate } from "../app_utils/validation/validateEmail";

let EmailForm = props => (
  console.log("this is props in Email Form", props),
  (
    <form id="reset-password-email-form" className="form">
      <EmailInput  />
      <ButtonPrimary
        id={"register-button"}
        disabled={props.invalid}
        onClick={props.handleLogin}
      >
        Send me a link
      </ButtonPrimary>
    </form>
  )
);

EmailForm = reduxForm({
  form: "email-form",
  validate
})(EmailForm);

EmailForm = connect(state => ({
  enableReinitialize: true
}))(EmailForm);

class ResetPasswordEmailLink extends Component {
  render() {
    return (
      <React.Fragment>
        <EmailForm />
        <p >
          <span className="sub-heading">For your security:</span> You may be
          asked to prove that you are the owner of your eduID before resetting
          the password.
        </p>
      </React.Fragment>
    );
  }
}

ResetPasswordEmailLink.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default ResetPasswordEmailLink;
