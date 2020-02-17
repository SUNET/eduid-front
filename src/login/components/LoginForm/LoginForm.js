import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { NavLink } from "react-router-dom";

import Input from "../Input";
import LinkRedirect from "../LinkRedirect";
import Link from "../Link";
import ButtonPrimary from "../ButtonPrimary";
import { withRouter } from "react-router-dom";

import { validate } from "../../app_utils/validation/validateEmail";

let LoginFormDetails = props => (
  // console.log("these are props in the LoginFormDetails:", props),
  // (
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
    <Field
      type={"password"}
      name={"password"}
      label={"password"}
      componentclass={"input"}
      id={"password-input"}
      component={Input}
      l10n={props.l10n}
      placeholder={"this is password"}
    />
    <div className="form-button-pair">
      <ButtonPrimary
        className={"settings-button"}
        id={"register-button"}
        disabled={props.invalid}
        onClick={props.handleLogin}
      >
        Login to eduID
      </ButtonPrimary>
      <LinkRedirect
        exact
        id={"link-forgot-password"}
        className={""}
        // to={`/reset/password-reset/`}
        to={`/forgot-password/get-email-link/`}
        text={"Set a new password"}
      />
      {/* <FormFeedback>{props.touched && props.l10n(error)}</FormFeedback> */}
    </div>
  </React.Fragment>
  // )
);

LoginFormDetails = reduxForm({
  form: "login-form",
  validate
})(LoginFormDetails);

LoginFormDetails = connect(state => ({
  enableReinitialize: true
}))(LoginFormDetails);

class LoginForm extends Component {
  render() {
    console.log("these are props in the LoginForm:", this.props);
    return (
      <div className="text-margin">
        <p className="sub-heading">Login to your eduID</p>
        <form id="login-form" className="form">
          <LoginFormDetails {...this.props} />
        </form>
        <p>
          If you dont have eduID you can register
          <Link
            className={"text-link"}
            href={`https://dashboard.eduid.se/`}
            text={"here"}
          />
          .
        </p>
      </div>
    );
  }
}

LoginForm.propTypes = {
  l10n: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func
};

export default withRouter(LoginForm);
