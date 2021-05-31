import React, { Fragment } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import EmailForm from "../../GroupManagement/EmailForm";
import PasswordFormMock from "../../GroupManagement/GroupNameForm";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import { validate } from "../../../app_utils/validation/validateEmail";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";

let LoginForm = (props) => {
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
        onClick={() => {}}
        id={""}
        className={"settings-button"}
      >
        Log in
      </ButtonPrimary>
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

export default InjectIntl(LoginForm);