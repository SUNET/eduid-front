import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { translate } from "login/translation";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { emailPattern } from "../../../app_utils/validation/regexPatterns";
import Link from "../../Links/Link";
import LinkRedirect from "../../Links/LinkRedirect";
import { setLocalStorage } from "../ResetPassword/CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "../ResetPassword/ResetPasswordMain";
import { Form as FinalForm, FormRenderProps } from "react-final-form";
import EmailInput from "login/components/Inputs/EmailInput";
import PasswordInput from "login/components/Inputs/PasswordInput";
import { callUsernamePasswordSaga } from "login/redux/sagas/login/postUsernamePasswordSaga";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import EduIDButton from "components/EduIDButton";

interface UsernamePwFormData {
  email?: string;
  "current-password"?: string;
}

export default function UsernamePw() {
  const dispatch = useAppDispatch();

  function handleSubmitUsernamePw(values: UsernamePwFormData) {
    if (values.email && values["current-password"]) {
      dispatch(callUsernamePasswordSaga({ email: values.email, currentPassword: values["current-password"] }));
    }
  }

  return (
    <div className="username-pw">
      <h2 className="heading">
        <FormattedMessage defaultMessage="Log in" description="Login front page" />
      </h2>
      <FinalForm<UsernamePwFormData>
        id="login-form"
        aria-label="login form"
        onSubmit={handleSubmitUsernamePw}
        render={(formProps: FormRenderProps<UsernamePwFormData>) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <EmailInput name="email" autoFocus={true} required={true} />
              <PasswordInput name="current-password" />

              <div className="flex-between">
                <div className="button-pair">
                  <UsernamePwSubmitButton {...formProps} />
                  <UsernamePwAnotherDeviceButton />
                </div>

                <div>
                  <RenderResetPasswordLink />
                  <RenderRegisterLink />
                </div>
              </div>
            </form>
          );
        }}
      ></FinalForm>
    </div>
  );
}

function RenderRegisterLink(): JSX.Element {
  const toSignup = useAppSelector((state) => state.config.signup_url);
  return (
    <p className="secondary-link text-small">
      <FormattedMessage defaultMessage="Don't have eduID? " description="Login front page" />
      &nbsp;&nbsp;
      <Link href={toSignup} text={<FormattedMessage defaultMessage=" Register" description="Login front page" />} />
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
      className={`send-link text-small ${request_in_progress ? "disabled" : ""}`}
      onClick={sendLink}
      text={translate("login.usernamePw.reset-password-link")}
    />
  );
}

function UsernamePwSubmitButton(props: FormRenderProps<UsernamePwFormData>): JSX.Element {
  const loading = useAppSelector((state) => state.app.loading_data);
  return (
    <EduIDButton
      color="primary"
      type="submit"
      disabled={props.invalid || props.pristine || loading}
      aria-disabled={props.invalid || loading}
      id="login-form-button"
      onClick={props.handleSubmit}
    >
      {loading ? (
        <FormattedMessage defaultMessage="Logging in" description="Login front page" />
      ) : (
        <FormattedMessage defaultMessage="Log in" description="Login front page" />
      )}
    </EduIDButton>
  );
}

function UsernamePwAnotherDeviceButton(): JSX.Element | null {
  const options = useAppSelector((state) => state.login.authn_options);
  const dispatch = useAppDispatch();

  if (!options.other_device) {
    return null;
  }

  async function handleOnClick() {
    // TODO: get email from the form here, and provide it as 'username' so that it is passed to device2
    dispatch(loginSlice.actions.startLoginWithAnotherDevice({ username: undefined }));
  }

  return (
    <EduIDButton color="primary" onClick={handleOnClick} id="login-other-device-button">
      <FontAwesomeIcon icon={faQrcode} />
      <FormattedMessage defaultMessage="Other device" description="Login UsernamePw" />
    </EduIDButton>
  );
}
