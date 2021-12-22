import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import { translate } from "login/translation";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { reduxForm, submit } from "redux-form";
import { emailPattern } from "../../../app_utils/validation/regexPatterns";
import resetPasswordSlice from "../../../redux/slices/resetPasswordSlice";
import ButtonPrimary from "../../Buttons/ButtonPrimary";
import Link from "../../Links/Link";
import LinkRedirect from "../../Links/LinkRedirect";
import { setLocalStorage } from "../ResetPassword/CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "../ResetPassword/ResetPasswordMain";
import UsernamePwForm from "./UsernamePwForm";

function RenderRegisterLink(): JSX.Element {
  const toSignup = useAppSelector((state) => state.config.signup_url);
  return (
    <p className="secondary-link">
      {translate("login.usernamePw.register-prompt")}
      <Link className="text-link" href={toSignup} text={translate("login.usernamePw.register-link")} />
    </p>
  );
}

function RenderResetPasswordLink(): JSX.Element {
  const loginRef = useAppSelector((state) => state.login.ref);
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const sendLink = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const input = document.querySelector("input[name='email']") as any;
    if (input) {
      const email = input.value;
      if (emailPattern.test(email)) {
        dispatch(resetPasswordSlice.actions.requestEmailLink(email));
        setLocalStorage(LOCAL_STORAGE_PERSISTED_EMAIL, email);
      } else history.push(`/reset-password/email/${loginRef}`);
    } else history.push(`/reset-password/email/${loginRef}`);
  };

  return (
    <LinkRedirect
      id={"link-forgot-password"}
      to={"/"}
      className={`send-link ${request_in_progress ? "disabled" : ""}`}
      onClick={sendLink}
      text={translate("login.usernamePw.reset-password-link")}
    />
  );
}

function UsernamePwSubmitButton(props: { invalid: boolean }): JSX.Element {
  const loading = useAppSelector((state) => state.app.loading_data);
  const dispatch = useAppDispatch();
  return (
    <ButtonPrimary
      type="submit"
      onClick={() => dispatch(submit("usernamePwForm"))}
      disabled={props.invalid || loading}
      aria-disabled={props.invalid || loading}
      id="login-form-button"
      className={"settings-button"}
    >
      {loading ? translate("login.usernamePw.submit-button-busy") : translate("login.usernamePw.submit-button-idle")}
    </ButtonPrimary>
  );
}

// Connect the UsernamePwSubmitButton to the UsernamePwForm, in order to get the "invalid" prop from that form
const UsernamePwFormButton = reduxForm({
  form: "usernamePwForm",
  destroyOnUnmount: false,
})(UsernamePwSubmitButton);

function UsernamePwOtherDeviceButton(): JSX.Element | null {
  const options = useAppSelector((state) => state.login.authn_options);

  if (!options.other_device) {
    return null;
  }

  return (
    <ButtonPrimary type="submit" onClick={() => {}} id="login-other-device-button" className={"settings-button"}>
      <FormattedMessage defaultMessage="Log in using another device" description="Login UsernamePw" />
    </ButtonPrimary>
  );
}

function UsernamePw() {
  return (
    <div className="username-pw">
      <h2 className="heading">
        <FormattedMessage id="login.usernamePw.h2-heading" defaultMessage="Log in" />
      </h2>
      <UsernamePwForm />
      <div className="button-pair">
        <UsernamePwFormButton />
        <UsernamePwOtherDeviceButton />
        <RenderResetPasswordLink />
      </div>
      <RenderRegisterLink />
    </div>
  );
}

export default UsernamePw;
