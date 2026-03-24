import { loginApi } from "apis/eduidLogin";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import EduIDButton from "components/Common/EduIDButton";
import TextInput from "components/Common/EduIDTextInput";
import { PassKey } from "components/Common/Passkey";
import PasswordInput from "components/Common/PasswordInput";
import UserNameInput from "components/Common/UserNameInput";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { emailPattern } from "helperFunctions/validation/regexPatterns";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Field as FinalField, Form as FinalForm, FormRenderProps, useField } from "react-final-form";
import { FormattedMessage } from "react-intl";
import { Link, useNavigate } from "react-router";
import loginSlice from "slices/Login";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import passwordIcon from "../../../img/password-icon.svg";
import qrCode from "../../../img/qr-code.svg";
import { LoginAbortButton } from "./LoginAbortButton";
import { LoginAtServiceInfo } from "./LoginAtServiceInfo";
import { forgetThisDevice, RememberMeCheckbox } from "./NewDevice";
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
  const [performAuthentication] = navigatorCredentialsApi.useLazyPerformAuthenticationQuery();
  const [conditionalAuthTrigger, setConditionalAuthTrigger] = useState(0);
  const conditionalQueryRef = useRef<ReturnType<typeof performAuthentication> | null>(null);
  // Cached challenge promise: both the conditional auth effect and the passkey button
  // share a single fetchMfaAuth call to avoid concurrent backend requests that race
  // on session.mfa_action and cause SessionOutOfSync.
  const challengePromiseRef = useRef<Promise<PublicKeyCredentialRequestOptionsJSON | undefined> | null>(null);
  let loginHeading;

  if (securityZoneAction) {
    loginHeading = (
      <FormattedMessage
        defaultMessage="Re-authentication: with Password"
        description="Security zone username and Password heading"
      />
    );
  } else if (webauthn) {
    loginHeading = (
      <FormattedMessage defaultMessage="Log in: with Password or Passkey" description="Login front page with passkey" />
    );
  } else {
    loginHeading = <FormattedMessage defaultMessage="Log in: with Password" description="Login front page" />;
  }

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
        dispatch(clearNotifications());
        if (response.data.payload.finished) {
          dispatch(loginSlice.actions.callLoginNext());
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

  // Fetch a challenge once and cache the promise. Both the conditional auth effect
  // and the passkey button reuse the same promise, so only one POST /mfa_auth is
  // in-flight at a time for challenge creation.
  const fetchChallengeOnce = useCallback((): Promise<PublicKeyCredentialRequestOptionsJSON | undefined> => {
    if (!challengePromiseRef.current) {
      if (!ref) return Promise.resolve(undefined);
      challengePromiseRef.current = fetchMfaAuth({ ref })
        .then((response) => {
          if (response.isSuccess) {
            return response.data.payload.webauthn_options;
          }
          return undefined;
        })
        .catch(() => {
          // Clear the cache on failure so the next attempt can retry
          challengePromiseRef.current = null;
          return undefined;
        });
    }
    return challengePromiseRef.current;
  }, [fetchMfaAuth, ref]);

  async function getChallenge() {
    // Abort any in-flight conditional auth before starting staged auth,
    // since the browser only allows one pending navigator.credentials.get() at a time.
    conditionalQueryRef.current?.abort();
    return fetchChallengeOnce();
  }

  // Track the last credential submission so that restartConditionalAuth
  // (and the effect) can wait for it before fetching a new challenge.
  const credentialSubmissionRef = useRef<Promise<unknown> | null>(null);

  async function useCredential(credential: PublicKeyCredentialJSON) {
    if (ref) {
      const promise = fetchMfaAuth({ ref: ref, webauthn_response: credential });
      credentialSubmissionRef.current = promise;
      await promise;
    }
  }

  function restartConditionalAuth() {
    setConditionalAuthTrigger((n) => n + 1);
  }

  useEffect(() => {
    if (!webauthn) {
      return;
    }
    let cancelled = false;
    // Clear cached challenge so a fresh one is fetched on each trigger
    challengePromiseRef.current = null;

    const conditionalAuthentication = async () => {
      if (!ref) {
        return;
      }
      // Wait for any in-flight credential submission to finish before fetching
      // a new challenge, otherwise the new challenge fetch and the old submission
      // will race on session.mfa_action in the backend.
      if (credentialSubmissionRef.current) {
        await credentialSubmissionRef.current.catch(() => {});
        credentialSubmissionRef.current = null;
      }
      if (cancelled) {
        return;
      }
      const webauthn_options = await fetchChallengeOnce();
      // After the await, check if this effect invocation was already cleaned up
      // (e.g. React StrictMode unmount-remount cycle). If so, bail out.
      if (cancelled) {
        return;
      }
      if (webauthn_options) {
        const queryPromise = performAuthentication({
          webauth_options: webauthn_options,
          mediation: "conditional",
        });
        conditionalQueryRef.current = queryPromise;
        const result = await queryPromise;
        if (cancelled) {
          return;
        }
        if (result.isSuccess) {
          const promise = fetchMfaAuth({ ref: ref!, webauthn_response: result.data });
          credentialSubmissionRef.current = promise;
          await promise;
        }
      }
    };
    conditionalAuthentication();
    return () => {
      cancelled = true;
      conditionalQueryRef.current?.abort();
    };
  }, [fetchChallengeOnce, fetchMfaAuth, performAuthentication, ref, webauthn, conditionalAuthTrigger]);

  return (
    <React.Fragment>
      <section className="intro">
        <h1>{loginHeading}</h1>
        <div className="lead">
          <LoginAtServiceInfo service_info={service_info} />
        </div>
        <SecurityZoneInfo />
      </section>
      <section className="username-pw-option">
        <FinalForm<UsernamePwFormData>
          aria-label="login form"
          onSubmit={handleSubmitUsernamePw}
          render={(formProps: FormRenderProps<UsernamePwFormData>) => {
            return (
              <form onSubmit={formProps.handleSubmit}>
                <UsernameInputPart />
                <PasswordInput name="currentPassword" autoComplete="current-password" />
                {!securityZoneAction && <RenderResetPasswordLink />}
                <div className="buttons">
                  {!securityZoneAction && <LoginAbortButton />}
                  <UsernamePwSubmitButton {...formProps} />
                  <UsernamePwAnotherDeviceButton />
                </div>
              </form>
            );
          }}
        ></FinalForm>

        {webauthn && (
          <div className="or-container">
            <div className="line"></div>
            <span>
              <FormattedMessage
                defaultMessage="or log in with passkey?"
                description="Alternative login passkey option"
              />
            </span>
            <div className="line"></div>
          </div>
        )}
      </section>
      {webauthn && (
        <Fragment>
          <section className="passkey-option">
            <PassKey
              setup={getChallenge}
              onSuccess={useCredential}
              onComplete={restartConditionalAuth}
              discoverable={webauthn}
            />
          </section>
          <hr className="border-line" />
        </Fragment>
      )}
      <RememberMeCheckbox />
    </React.Fragment>
  );
}

function UsernameInputPart(): React.JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const webauthn = useAppSelector((state) => state.login.authn_options.webauthn);
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
            <EduIDButton buttonstyle="link normal-case" id="wrong-person-button" onClick={handleClickWrongPerson}>
              <FormattedMessage defaultMessage="Different user?" description="Login username input" />
            </EduIDButton>
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
  return (
    <UserNameInput
      name="username"
      autoFocus={true}
      required={true}
      autoComplete={webauthn ? "username webauthn" : "username"}
    />
  );
}

function RenderResetPasswordLink(): React.JSX.Element {
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
    <Link id="link-forgot-password" className="text-small" to={"/"} onClick={sendLink}>
      <FormattedMessage defaultMessage="Forgot your password?" description="Reset password link" />
    </Link>
  );
}

export function UsernamePwSubmitButton(props: FormRenderProps<UsernamePwFormData>): React.JSX.Element {
  /* Disable the button when:
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
  const _disabled = Boolean(hasErrors || !_inputValues || hasSubmitError);

  return (
    <EduIDButton
      buttonstyle="primary icon"
      type="submit"
      aria-disabled={_disabled}
      id="login-form-button"
      onClick={props.handleSubmit}
    >
      <img className="password-icon" height="20" alt="password icon" src={passwordIcon} />
      <FormattedMessage defaultMessage="log in" description="Login front page pw" />
    </EduIDButton>
  );
}

function UsernamePwAnotherDeviceButton(): React.JSX.Element | null {
  const options = useAppSelector((state) => state.login.authn_options);
  const dispatch = useAppDispatch();
  const usernameField = useField("username");

  if (!options.other_device || securityZoneAction) {
    return null;
  }

  async function handleOnClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault(); // don't submit the form when this button is clicked

    dispatch(loginSlice.actions.startLoginWithAnotherDevice({ username: usernameField.input.value || undefined }));
  }

  return (
    <EduIDButton buttonstyle="primary icon" onClick={handleOnClick} id="login-other-device-button">
      <img className="qr-icon" height="20" alt="qr icon" src={qrCode} />
      <FormattedMessage defaultMessage="other device" description="Login UsernamePw other device" />
    </EduIDButton>
  );
}
