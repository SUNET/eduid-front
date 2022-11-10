import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchUsernamePassword } from "apis/eduidLogin";
import EduIDButton from "components/EduIDButton";
import TextInput from "components/EduIDTextInput";
import { useAppDispatch, useAppSelector } from "login/app_init/hooks";
import EmailInput from "login/components/Inputs/EmailInput";
import PasswordInput from "login/components/Inputs/PasswordInput";
import loginSlice from "login/redux/slices/loginSlice";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import React from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps, useField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router-dom";
import { clearNotifications } from "reducers/Notifications";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { forgetThisDevice } from "./NewDevice";

interface UsernamePwFormData {
  email?: string;
  "current-password"?: string;
}

export default function UsernamePw() {
  const dispatch = useAppDispatch();
  const ref = useAppSelector((state) => state.login.ref);
  const service_info = useAppSelector((state) => state.login.service_info);

  async function handleSubmitUsernamePw(values: UsernamePwFormData) {
    const errors: UsernamePwFormData = {};

    if (ref && values.email && values["current-password"]) {
      /* Send username and password to backend for authentication. If the response is successful,
       * trigger a call to the /next endpoint to get the next step in the login process.
       */
      const res = await dispatch(
        fetchUsernamePassword({ ref, username: values.email, password: values["current-password"] })
      );
      if (fetchUsernamePassword.fulfilled.match(res)) {
        if (res.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
        }
      }
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
              <fieldset>
                <UsernameInputPart />
              </fieldset>
              <fieldset>
                <PasswordInput name="current-password" autoComplete="current-password" />
              </fieldset>

              <div className="flex-between">
                <div className="buttons">
                  <LoginAbortButton />
                  <UsernamePwSubmitButton {...formProps} />
                  <UsernamePwAnotherDeviceButton />
                </div>

                <div className="links">
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
        <FinalField
          required={true}
          disabled={true}
          component={TextInput}
          componentClass="input"
          name="email"
          defaultValue={authn_options.forced_username}
          label={<FormattedMessage defaultMessage="Username" description="username input field label" />}
        />
      </React.Fragment>
    );
  }
  return <EmailInput name="email" autoFocus={true} required={true} autoComplete="username" />;
}

function RenderRegisterLink(): JSX.Element {
  const toSignup = useAppSelector((state) => state.config.signup_url);
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

function RenderResetPasswordLink(): JSX.Element {
  const request_in_progress = useAppSelector((state) => state.app.request_in_progress);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailField = useField("email");

  const sendLink = (e: React.SyntheticEvent) => {
    e.preventDefault();

    /* Propagate the email address to the reset password slice if valid, or if empty. */
    if ((emailField.input.value && emailField.meta.valid) || !emailField.input.value) {
      dispatch(resetPasswordSlice.actions.setEmailAddress(emailField.input.value));
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
      <FontAwesomeIcon icon={faQrcode as IconProp} />
      <FormattedMessage defaultMessage="Other device" description="Login UsernamePw" />
    </EduIDButton>
  );
}
