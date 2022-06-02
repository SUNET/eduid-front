import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import EmailInput from "login/components/Inputs/EmailInput";
import PasswordInput from "login/components/Inputs/PasswordInput";
import { callUsernamePasswordSaga } from "login/redux/sagas/login/postUsernamePasswordSaga";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { translate } from "login/translation";
import React from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { emailPattern } from "../../../app_utils/validation/regexPatterns";
import Link from "../../Links/Link";
import LinkRedirect from "../../Links/LinkRedirect";
import { setLocalStorage } from "../ResetPassword/CountDownTimer";
import { LOCAL_STORAGE_PERSISTED_EMAIL } from "../ResetPassword/ResetPasswordMain";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { forgetThisDevice } from "./NewDevice";

interface UsernamePwFormData {
  email?: string;
  "current-password"?: string;
}

export default function UsernamePw() {
  const dispatch = useAppDispatch();
  const service_info = useAppSelector((state) => state.login.service_info);

  function handleSubmitUsernamePw(values: UsernamePwFormData) {
    const errors: UsernamePwFormData = {};

    if (values.email && values["current-password"]) {
      dispatch(callUsernamePasswordSaga({ email: values.email, currentPassword: values["current-password"] }));
      return;
    }

    if (!values.email) {
      errors.email = "required";
    }
    if (!values["current-password"]) {
      errors["current-password"] = "required";
    }
    return errors;
  }

  return (
    <div className="username-pw">
      <h1>
        <FormattedMessage defaultMessage="Log in" description="Login front page" />
      </h1>

      <div className="lead">
        <LoginAtServiceInfo service_info={service_info} />
      </div>

      <FinalForm<UsernamePwFormData>
        id="login-form"
        aria-label="login form"
        onSubmit={handleSubmitUsernamePw}
        render={(formProps: FormRenderProps<UsernamePwFormData>) => {
          return (
            <form onSubmit={formProps.handleSubmit}>
              <UsernameInputPart />
              <fieldset>
                <PasswordInput name="current-password" autoComplete="current-password" />
              </fieldset>

              <div className="flex-between">
                <div className="buttons">
                  <LoginAbortButton />
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

function UsernameInputPart(): JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const dispatch = useAppDispatch();

  function handleClickWrongPerson() {
    forgetThisDevice(dispatch);
    // re-fetch '/next' now that the conditions for logging in has changed
    dispatch(loginSlice.actions.callLoginNext());
  }

  if (authn_options.forced_username) {
    return (
      <React.Fragment>
        <div className="welcome-back-container">
          <h3>
            <FormattedMessage
              defaultMessage="Welcome back, {username}!"
              description="Login username input"
              values={{
                username: <strong>{authn_options.display_name}</strong>,
              }}
            />
          </h3>
          <a className="text-small" id="wrong-person-button" onClick={handleClickWrongPerson}>
            <FormattedMessage defaultMessage="Different user?" description="Login username input" />
          </a>
        </div>
        <fieldset>
          <FinalField
            required={true}
            disabled={true}
            component={TextInput}
            componentClass="input"
            name="email"
            defaultValue={authn_options.forced_username}
            label={<FormattedMessage defaultMessage="Username" description="username input field label" />}
          />
        </fieldset>
      </React.Fragment>
    );
  }
  return <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />;
}

function RenderRegisterLink(): JSX.Element {
  const toSignup = useAppSelector((state) => state.config.signup_url);
  return (
    <div className="secondary-link text-small">
      <FormattedMessage defaultMessage="Don't have eduID? " description="Login front page" />
      &nbsp;&nbsp;
      <Link href={toSignup} text={<FormattedMessage defaultMessage=" Register" description="Login front page" />} />
    </div>
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
      className={`text-small ${request_in_progress ? "disabled" : ""}`}
      onClick={sendLink}
      text={translate("login.usernamePw.reset-password-link")}
    />
  );
}

function UsernamePwSubmitButton(props: FormRenderProps<UsernamePwFormData>): JSX.Element {
  const loading = useAppSelector((state) => state.app.loading_data);

  /* Disable the button when:
   *   - the app is loading data
   *   - there is a form validation error
   *   - the last submit resulted in a submitError, and no changes have been made since
   */
  const _submitError = Boolean(props.submitError && !props.dirtySinceLastSubmit);
  const _disabled = Boolean(props.hasValidationErrors || _submitError || loading);

  return (
    <EduIDButton
      buttonstyle="primary"
      type="submit"
      disabled={_disabled}
      aria-disabled={_disabled}
      id="login-form-button"
      onClick={props.handleSubmit}
    >
      <FormattedMessage defaultMessage="Log in" description="Login front page" />
    </EduIDButton>
  );
}

function UsernamePwAnotherDeviceButton(): JSX.Element | null {
  const options = useAppSelector((state) => state.login.authn_options);
  const dispatch = useAppDispatch();

  if (!options.other_device) {
    return null;
  }

  async function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault(); // don't submit the form when this button is clicked

    // TODO: get email from the form here, and provide it as 'username' so that it is passed to device2
    dispatch(loginSlice.actions.startLoginWithAnotherDevice({ username: undefined }));
  }

  return (
    <EduIDButton buttonstyle="primary" onClick={handleOnClick} className="btn-icon" id="login-other-device-button">
      <FontAwesomeIcon icon={faQrcode} />
      <FormattedMessage defaultMessage="Other device" description="Login UsernamePw" />
    </EduIDButton>
  );
}
