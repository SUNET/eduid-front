import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { reduxForm, submit } from "redux-form";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import UsernamePwForm from "./UsernamePwForm";
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

let UsernamePwFormButton = ({ invalid, dispatch }) => {
  const loading = useSelector((state) => state.app.loading_data);
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(submit("usernamePwForm"))}
      disabled={invalid || loading}
      id="login-form-button"
      className={"settings-button"}
    >
      {loading ? "Logging" : "Log"} in
    </ButtonPrimary>
  );
};

UsernamePwFormButton = reduxForm({
  form: "usernamePwForm",
  destroyOnUnmount: false,
})(UsernamePwFormButton);

const UsernamePw = (props) => (
  <div className="login">
    <p className="heading">Log in</p>
    <UsernamePwForm {...props} />
    <div className="button-pair">
      <RenderResetPasswordLink />
      <UsernamePwFormButton {...props} />
    </div>
    <RenderRegisterLink />
  </div>
);

UsernamePw.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(UsernamePw);
