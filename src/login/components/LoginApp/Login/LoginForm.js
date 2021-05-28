import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
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

let LoginForm = (props) => {
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
      {/* <ButtonPrimary
        type={"submit"}
        onClick={handleAddEmail}
        id={""}
        className={"settings-button"}
      >
        Log in
      </ButtonPrimary> */}
    </Fragment>
  );
};

LoginForm = reduxForm({
  form: "loginForm",
  validate,
})(LoginForm);

LoginForm = connect(() => ({
  enableReinitialize: true,
}))(LoginForm);


export default withRouter(LoginForm);
