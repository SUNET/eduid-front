import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { reduxForm, submit } from "redux-form";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import UsernamePwForm from "./UsernamePwForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";

const RenderRegisterLink = ({ translate }) => (
  <p className="secondary-link">
    {translate("login.usernamePw.register-prompt")}
    <Link
      className="text-link"
      href="https://signup.eduid.se/"
      text={translate("login.usernamePw.register-link")}
    />
  </p>
);

const RenderResetPasswordLink = ({ translate }) => (
  <LinkRedirect
    exact
    id={"link-forgot-password"}
    className={""}
    to={`/reset-password/`}
    text={translate("login.usernamePw.reset-password-link")}
    // text={"Forgot your password?"}
  />
);

let UsernamePwFormButton = ({ invalid, dispatch, translate }) => {
  const loading = useSelector((state) => state.app.loading_data);
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(submit("usernamePwForm"))}
      disabled={invalid || loading}
      aria-disabled={invalid || loading}
      id="login-form-button"
      className={"settings-button"}
    >
      {loading
        ? translate("login.usernamePw.submit-button-busy")
        : translate("login.usernamePw.submit-button-idle")}
    </ButtonPrimary>
  );
};

UsernamePwFormButton = reduxForm({
  form: "usernamePwForm",
  destroyOnUnmount: false,
})(UsernamePwFormButton);

const UsernamePw = (props) => {
  return (
    <div className="login">
      <h2 className="heading">Log in</h2>
      <UsernamePwForm {...props} />
      <div className="button-pair">
        <RenderResetPasswordLink {...props} />
        <UsernamePwFormButton {...props} />
      </div>
      <RenderRegisterLink {...props} />
    </div>
  );
};

UsernamePw.propTypes = {
  translate: PropTypes.func,
};

export default InjectIntl(UsernamePw);
