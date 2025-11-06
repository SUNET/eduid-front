import { loginApi } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import TextInput from "components/Common/EduIDTextInput";
import PasswordInput from "components/Common/PasswordInput";
import { SecurityKey } from "components/Common/SecurityKey";
import UserNameInput from "components/Common/UserNameInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { emailPattern } from "helperFunctions/validation/regexPatterns";
import React, { Fragment } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps, useField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import qrCode from "../../../img/qr-code.svg";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { forgetThisDevice } from "./NewDevice";
import { securityZoneAction, SecurityZoneInfo } from "./SecurityZoneInfo";

interface UsernamePwFormData {
  username?: string;
  currentPassword?: string;
}

export default function UsernamePw() {
  const dispatch = useAppDispatch();
  const ref = useAppSelector((state) => state.login.ref);
  const service_info = useAppSelector((state) => state.login.service_info);
  const webauthn = useAppSelector((state) => state.login.authn_options.webauthn);
  const [fetchUsernamePassword] = loginApi.useLazyFetchUsernamePasswordQuery();
  const [fetchMfaAuth] = loginApi.useLazyFetchMfaAuthQuery();

  async function handleSubmitUsernamePw(values: UsernamePwFormData) {
    const errors: UsernamePwFormData = {};

    if (ref && values.username && values.currentPassword) {
      /* Send username and password to backend for authentication. If the response is successful,
       * trigger a call to the /next endpoint to get the next step in the login process.
       */
      const response = await fetchUsernamePassword({
        ref,
        username: values.username,
        password: values.currentPassword,
      });
      if (response.isSuccess) {
        if (response.data.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
          dispatch(clearNotifications());
        }
      }
      return;
    }

    if (!values.username) {
      errors.username = "required";
    }
    if (!values.currentPassword) {
      errors.currentPassword = "required";
    }
    return errors;
  }

  async function getChallenge() {
    if (ref) {
      const response = await fetchMfaAuth({ ref: ref });
      if (response.isSuccess) {
        return response.data.payload.webauthn_options;
      }
    }
  }

  function useCredential(credential: PublicKeyCredentialJSON) {
    if (ref) {
      fetchMfaAuth({ ref: ref, webauthn_response: credential });
    }
  }
  return (
    <React.Fragment>
      <section className="intro">
        <h1>
          {securityZoneAction ? (
            <FormattedMessage
              defaultMessage="Re-authentication: with Password"
              description="Security zone username and Password heading"
            />
          ) : webauthn ? (
            <FormattedMessage
              defaultMessage="Log in: with Passkey or Password"
              description="Login front page with passkey"
            />
          ) : (
            <FormattedMessage defaultMessage="Log in: with Password" description="Login front page" />
          )}
        </h1>

        <div className="lead">
          <LoginAtServiceInfo service_info={service_info} />
        </div>
        <SecurityZoneInfo />
      </section>
      {webauthn && (
        <Fragment>
          <div className="options">
            <SecurityKey setup={getChallenge} onSuccess={useCredential} discoverable={webauthn} />
          </div>
          <div className="or-container">
            <div className="line" />
            <span>
              <FormattedMessage defaultMessage="Having issues using a security key?" />
            </span>
            <div className="line" />
          </div>
        </Fragment>
      )}
      <section className="username-pw">
        <FinalForm<UsernamePwFormData>
          aria-label="login form"
          onSubmit={handleSubmitUsernamePw}
          render={(formProps: FormRenderProps<UsernamePwFormData>) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <UsernameInputPart />
                <PasswordInput name="currentPassword" autoComplete="current-password" />
                <div className="flex-between">
                  <div className="buttons">
                    {!securityZoneAction && <LoginAbortButton />}
                    <UsernamePwSubmitButton {...formProps} />
                    <UsernamePwAnotherDeviceButton />
                  </div>
                  {!securityZoneAction && <RenderResetPasswordLink />}
                </div>
              </form>
            );
          }}
        ></FinalForm>
      </section>
    </React.Fragment>
  );
}

function UsernameInputPart(): React.JSX.Element {
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
        {!securityZoneAction && (
          <div className="welcome-back-container">
            <legend>
              <FormattedMessage
                defaultMessage="Welcome back, {username}!"
                description="Login username input"
                values={{
                  username: <strong>{authn_options.display_name}</strong>,
                }}
              />
            </legend>
            <a href="#" className="text-small" id="wrong-person-button" onClick={handleClickWrongPerson}>
              <FormattedMessage defaultMessage="Different user?" description="Login username input" />
            </a>
          </div>
        )}
        <FinalField
          required={true}
          disabled={true}
          component={TextInput}
          componentClass="input"
          name="username"
          autoComplete="username"
          defaultValue={authn_options.forced_username}
          label={<FormattedMessage defaultMessage="Username" description="username input field label" />}
        />
      </React.Fragment>
    );
  }
  return <UserNameInput name="username" autoFocus={true} required={true} autoComplete="username" />;
}

function RenderRegisterLink(): React.JSX.Element {
  const toSignup = useAppSelector((state) => state.config.signup_link);
  return (
    <div className="text-small">
      <FormattedMessage defaultMessage="Don't have eduID?" description="Login front page" />
      &nbsp;&nbsp;
      <a href={toSignup} id="register-link">
        <FormattedMessage defaultMessage="Register" description="Login front page" />
      </a>
    </div>
  );
}

function RenderResetPasswordLink(): React.JSX.Element {
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usernameField = useField("username");
  const isValidEmail = emailPattern.test(usernameField.input.value);

  const sendLink = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /* Propagate the email address to the reset password slice if valid, or if empty. */
    if ((isValidEmail && usernameField.meta.valid) || !usernameField.input.value) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(usernameField.input.value));
    }
    dispatch(clearNotifications());
    navigate("/reset-password/");
  };

  return (
    <Link
      id="link-forgot-password"
      className={`text-small ${request_in_progress ? "disabled" : ""}`}
      to={"/"}
      onClick={sendLink}
    >
      <FormattedMessage defaultMessage="Forgot your password?" description="Reset password link" />
    </Link>
  );
}

export function UsernamePwSubmitButton(props: FormRenderProps<UsernamePwFormData>): React.JSX.Element {
  const loading = useAppSelector((state) => state.app.loading_data);
  /* Disable the button when:
   *   - the app is loading data
   *   - there is a form validation error
   *   - the last submit resulted in a submitError, and no changes have been made since
   */
  const _hasUserNameValue = Boolean(props.values?.["username"]);
  const _hasPasswordValue = Boolean(props.values?.["currentPassword"]);
  const _inputValues = securityZoneAction
    ? Boolean(_hasPasswordValue)
    : Boolean(_hasUserNameValue && _hasPasswordValue);
  const _submitError = Boolean(props.submitError && !props.dirtySinceLastSubmit);
  const hasErrors = props.hasValidationErrors ?? true;
  const hasSubmitError = _submitError ?? true;
  const isLoading = loading ?? true;
  const _disabled = Boolean(hasErrors || !_inputValues || hasSubmitError || isLoading);

  return (
    <EduIDButton
      buttonstyle="primary"
      type="submit"
      aria-disabled={_disabled}
      id="login-form-button"
      onClick={props.handleSubmit}
    >
      {securityZoneAction ? (
        <FormattedMessage defaultMessage="Continue" description="Security zone continue" />
      ) : (
        <FormattedMessage defaultMessage="Log in" description="Login front page" />
      )}
    </EduIDButton>
  );
}

function UsernamePwAnotherDeviceButton(): React.JSX.Element | null {
  const options = useAppSelector((state) => state.login.authn_options);
  const dispatch = useAppDispatch();

  if (!options.other_device || securityZoneAction) {
    return null;
  }

  async function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault(); // don't submit the form when this button is clicked

    // TODO: get email from the form here, and provide it as 'username' so that it is passed to device2
    dispatch(loginSlice.actions.startLoginWithAnotherDevice({ username: undefined }));
  }

  return (
    <EduIDButton buttonstyle="primary icon" onClick={handleOnClick} id="login-other-device-button">
      <img className="qr-icon" height="20" alt="qr icon" src={qrCode} />
      <FormattedMessage defaultMessage="Other device" description="Login UsernamePw" />
    </EduIDButton>
  );
}
