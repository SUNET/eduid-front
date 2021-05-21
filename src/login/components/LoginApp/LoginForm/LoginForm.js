import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import EmailForm from "../../GroupManagement/EmailForm";
import PasswordFormMock from "../../GroupManagement/GroupNameForm";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import { validate } from "../../../app_utils/validation/validateEmail";

let RenderRegisterInfo = () => (
  <p>
    If you dont have eduID you can register
    <Link
      className={"text-link"}
      href={`https://dashboard.eduid.se/`}
      text={"here"}
    />
    .
  </p>
);

let LoginFormDetails = (props) => {
  const { handleAddEmail } = props;
  return (
    <Fragment>
      <EmailForm
        {...props}
        required={true}
        submitButton={false}
        onSubmit={() => {}}
      />
      <PasswordFormMock
        form={"password"}
        label={"Password"}
        submitButton={false}
        placeholder={"Enter a password"}
        helpBlock={""}
        handleSubmit={() => {}}
      />
      <ButtonPrimary
        type={"submit"}
        onClick={handleAddEmail}
        id={""}
        className={"settings-button"}
      >
        Log in
      </ButtonPrimary>
    </Fragment>
  );
};

LoginFormDetails = reduxForm({
  form: "loginForm",
  validate,
})(LoginFormDetails);

LoginFormDetails = connect(() => ({
  enableReinitialize: true,
}))(LoginFormDetails);

let LoginForm = (props) => (
  <Fragment>
    <p className="heading">Login to your eduID</p>
    <LoginFormDetails {...props} />
    <RenderRegisterInfo />
    <LinkRedirect
      exact
      id={"link-forgot-password"}
      className={""}
      to={`/reset-password/`}
      text={"Set a new password"}
    />
  </Fragment>
);

LoginForm.propTypes = {
  translate: PropTypes.func,
  validate: PropTypes.func,
};

export default withRouter(LoginForm);
