import React from "react";
import PropTypes from "prop-types";
import { reduxForm, submit } from "redux-form";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import LoginForm from "./LoginForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

const RenderRegisterLink = () => (
  <p className="secondary-link">
    Don&apos;t have eduID?
    <Link
      className={"text-link"}
      href={`https://signup.eduid.se/`}
      text={"Register here."}
    />
  </p>
);

const RenderResetPasswordLink = () => (
  <LinkRedirect
    exact
    id={"link-forgot-password"}
    className={""}
    to={`/reset-password/`}
    text={"Forgot your password?"}
  />
);

let LoginFormButton = ({ invalid, dispatch, pristine }) => {
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(submit("loginForm"))}
      disabled={invalid || pristine}
      id={""}
      className={"settings-button"}
    >
      Log in
    </ButtonPrimary>
  );
};

LoginFormButton = reduxForm({
  form: "loginForm",
  destroyOnUnmount: false,
})(LoginFormButton);

const UsernamePw = (props) => {
  const handleUsernamePassword = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <p className="heading">Log in</p>
      <LoginForm {...props} handleSubmit={handleUsernamePassword} />
      <div className="button-pair">
        <RenderResetPasswordLink />
        <LoginFormButton {...props} />
      </div>
      <RenderRegisterLink />
    </div>
  );
};

UsernamePw.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(UsernamePw);
