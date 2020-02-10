import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import Input from "../Input";
import Link from "../Link";
import EduIDButton from "components/EduIDButton";

import { validate } from "../../app_utils/validation/validateEmail";

let LoginForm = props => (
  <div className="text-margin">
    <p className="sub-heading">Login to your eduID</p>
    <div id="login-form" className="form">
      <Field
        type={"email"}
        name={"email"}
        label={"email address"}
        inputclass={"input"}
        id={"email-input"}
        component={Input}
        // l10n={props.l10n}
        l10n={"props.l10n string email"}
        placeholder={"example@email.com"}
      />
      <Field
        type={"password"}
        name={"password"}
        label={"password"}
        componentclass={"input"}
        id={"password-input"}
        component={Input}
        // l10n={props.l10n}
        l10n={"props.l10n string password"}
        placeholder={"this is password"}
      />
    </div>
    <div className="form-button-pair">
      <EduIDButton
        className="settings-button"
        id="register-button"
        disabled={props.invalid}
        onClick={props.handleEmail}
      >
        Login to eduID
      </EduIDButton>
      <Link
        id={"link-forgot-password"}
        class={""}
        href={"https://dashboard.eduid.se/"}
        text={"Forgot your password?"}
      />
      {/* <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback> */}
    </div>
    <p>
      If you dont have eduID you can register
      <Link
        className={"text-link"}
        href={"https://dashboard.eduid.se/"}
        text={"here"}
      />
      .
    </p>
  </div>
);

LoginForm = reduxForm({
  form: "loginForm",
  validate
})(LoginForm);

LoginForm = connect(state => ({
  enableReinitialize: true
}))(LoginForm);

LoginForm.propTypes = {
  l10n: PropTypes.func.isRequired,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired
};

export default LoginForm;
