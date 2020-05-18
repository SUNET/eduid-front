import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";

// import Input from "../Input";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import EmailInput from "../../Inputs/EmailInput";
import PasswordInput from "../../Inputs/PasswordInput";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

import { validate } from "../../../app_utils/validation/validateEmail";

let LoginFormDetails = (props) => (
  // console.log("these are props in the LoginFormDetails:", props),
  // (
  <Fragment>
    <EmailInput {...props} />
    <PasswordInput />
    <div className="button-pair">
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
        to={`/reset/reset-password/`}
        text={"Set a new password"}
      />
    </div>
  </Fragment>
  // )
);

LoginFormDetails = reduxForm({
  form: "login-form",
  validate,
})(LoginFormDetails);

LoginFormDetails = connect((state) => ({
  enableReinitialize: true,
}))(LoginFormDetails);

class LoginForm extends Component {
  render() {
    // console.log("these are props in the LoginForm:", this.props);
    return (
      <div id="panel-container" className="text-margin">
        <div className="text-content">
          <p className="sub-heading">Login to your eduID</p>
          <p>
            Connect your eduID to your id number or edit your personal details.
          </p>
        </div>
        <div className="text-content">
          <form id="login-form" className="form">
            <LoginFormDetails {...this.props} />
          </form>
        </div>
        <div className="text-content">
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
      </div>
    );
  }
}

LoginForm.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

export default withRouter(LoginForm);
