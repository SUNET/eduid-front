import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import { validate } from "../../../app_utils/validation/validateEmail";

let LoginFormDetails = (props) => (
  <>
    <EmailInput {...props} />
    <PasswordInput />
    <div className="button-pair">
      <ButtonPrimary
        className={"settings-button"}
        id={"login-button"}
        disabled={props.invalid}
        onClick={props.handleLogin}
      >
        Login to eduID
      </ButtonPrimary>
      <LinkRedirect
        exact
        id={"link-forgot-password"}
        to={`/reset/reset-password/`}
        text={"Set a new password"}
      />
    </div>
  </>
);

LoginFormDetails = reduxForm({
  form: "login-form",
  validate,
})(LoginFormDetails);

LoginFormDetails = connect(() => ({
  enableReinitialize: true,
}))(LoginFormDetails);

class LoginForm extends Component {
  render() {
    return (
      <>
        <p className="heading">Login to your eduID</p>
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
      </>
    );
  }
}

LoginForm.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default withRouter(LoginForm);
