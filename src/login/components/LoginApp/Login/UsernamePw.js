import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { reduxForm, submit } from "redux-form";
import LinkRedirect from "../../Links/LinkRedirect";
import Link from "../../Links/Link";
import UsernamePwForm from "./UsernamePwForm";
import InjectIntl from "../../../translation/InjectIntl_HOC_factory";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import PropTypes from "prop-types";
import { postEmailLink } from "../../../redux/actions/postResetPasswordActions";
import { setLocalStorage } from "../ResetPassword/CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "../ResetPassword/ResetPasswordMain";
import { emailPattern } from "../../../app_utils/validation/regexPatterns";

const RenderRegisterLink = ({ translate }) => {
  const toSignup = useSelector((state) => state.config.signup_url);
  return (
    <p className="secondary-link">
      {translate("login.usernamePw.register-prompt")}
      <Link
        className="text-link"
        href={toSignup}
        text={translate("login.usernamePw.register-link")}
      />
    </p>
  );
};

const RenderResetPasswordLink = ({ translate }) => {
  const loginRef = useSelector((state) => state.login.ref);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const sendLink = (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name='email']") && 
      document.querySelector("input[name='email']").value;
    if(email){
      if(emailPattern.test(email)){
        dispatch(postEmailLink(email));
        setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL , email)
      }else history.push(`/reset-password/email/${loginRef}`)
    } else history.push(`/reset-password/email/${loginRef}`)
  };

  return (
    <LinkRedirect
      id={"link-forgot-password"}
      to={"/"}
      onClick={sendLink}
      text={translate("login.usernamePw.reset-password-link")}
    />
  );
};

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
