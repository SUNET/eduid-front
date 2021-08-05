import React from "react";
import { useSelector } from "react-redux";
import { reduxForm, submit } from "redux-form";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import UsernamePwForm from "./UsernamePwForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";

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
  />
);

let UsernamePwFormButton = ({ invalid, dispatch, translate }) => {
  const errorMessage = useSelector((state) => state.notifications.errors);
  const loading = useSelector((state) => state.app.loading_data);
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(submit("usernamePwForm"))}
      disabled={errorMessage.length !== 0 || invalid || loading}
      aria-disabled={errorMessage.length !== 0 || invalid || loading}
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
  invalid: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
})(UsernamePwFormButton);

const UsernamePw = (props) => {
  return (
    <div className="username-pw">
      <h2 className="heading">
        {props.translate("login.usernamePw.h2-heading")}
      </h2>
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
  translate: PropTypes.func.isRequired,
};
UsernamePwFormButton.propTypes = {
  translate: PropTypes.func.isRequired,
};
RenderResetPasswordLink.propTypes = {
  translate: PropTypes.func.isRequired,
};
RenderRegisterLink.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default InjectIntl(UsernamePw);
