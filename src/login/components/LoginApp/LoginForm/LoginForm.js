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
  <React.Fragment>
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
        className={""}
        to={"/reset/reset-password/"}
        text={"Set a new password"}
      />
    </div>
  </React.Fragment>
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
      <Fragment>
        <p className="heading">Login to your eduID</p>
        {/* <p>
          If you log in you can to complete your identity process or edit your
          current details.
        </p> */}
        <form id="login-form" className="form">
          <LoginFormDetails {...this.props} />
        </form>
        <p>
          If you dont have eduID you can register
          <Link
            className={"text-link"}
            href={"https://dashboard.eduid.se/"}
            text={"here"}
          />
          .
        </p>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  translate: PropTypes.func,
  // handleAccept: PropTypes.func.isRequired,
  validate: PropTypes.func,
};

export default withRouter(LoginForm);
