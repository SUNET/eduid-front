import { loginApi } from "apis/eduidLogin";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { performAuthentication } from "helperFunctions/navigatorCredential";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import resetPasswordSlice from "slices/ResetPassword";
import SecurityKeyGif from "../../../img/computer_animation.gif";
import { ResetPasswordGlobalStateContext } from "../ResetPassword/ResetPasswordGlobalState";

interface SecurityKeyProps {
  readonly webauthn?: any;
  setActive?(val: boolean): void;
}

export function SecurityKey(props: SecurityKeyProps): React.JSX.Element {
  // The SecurityKey button is 'active' after first being pressed. In that mode, it shows
  // a small animation and invokes the navigator.credentials.get() thunk that will result
  // in 'fulfilled' after the user uses the security key to authenticate. The 'active' mode
  // can also be cancelled or restarted with buttons in the UI.
  const [active, setActive] = useState(false);

  return (
    <div className="option-wrapper">
      <div className="option">
        {active ? (
          <SecurityKeyActive webauthn={props.webauthn} setActive={setActive} />
        ) : (
          <SecurityKeyInactive webauthn={props.webauthn} setActive={setActive} />
        )}
        {active && (
          <p className="help-text">
            <FormattedMessage
              description="login mfa primary option hint"
              defaultMessage="If your Security Key has a button, don't forget to tap it."
            />
          </p>
        )}
      </div>
    </div>
  );
}

function SecurityKeyInactive(props: SecurityKeyProps): React.JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);
  let buttonDisabled = false;

  if (props.webauthn !== undefined && !props.webauthn) {
    buttonDisabled = true;
  }

  useEffect(() => {
    if (ref.current) ref?.current?.focus();
  }, []);

  return (
    <Fragment>
      <h3>
        <FormattedMessage description="login this device, security key button" defaultMessage="Security key" />
      </h3>
      <p className="help-text">
        <FormattedMessage
          description="platform authn help text"
          defaultMessage="E.g. USB Security Key or the device you are currently using."
        />
      </p>
      {/* TODO: Use EduIDButton component after removing Reactstrap Button */}
      <button
        ref={ref}
        className="primary"
        type="submit"
        onClick={() => {
          if (props.setActive) props.setActive(true);
        }}
        id="mfa-security-key"
        disabled={buttonDisabled}
      >
        <FormattedMessage description="login mfa primary option button" defaultMessage="Use security key" />
      </button>
    </Fragment>
  );
}

function SecurityKeyActive(props: SecurityKeyProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  //login
  const mfa = useAppSelector((state) => state.login.mfa);
  const ref = useAppSelector((state) => state.login.ref);
  const this_device = useAppSelector((state) => state.login.this_device);
  //resetpw
  const resetPasswordContext = useContext(ResetPasswordGlobalStateContext);
  const webauthn_assertion = useAppSelector((state) => state.resetPassword.webauthn_assertion);
  const [fetchMfaAuth] = loginApi.useLazyFetchMfaAuthQuery();

  async function startTokenAssertion(webauthn_challenge?: string) {
    if (location.pathname.includes("login")) {
      if (webauthn_challenge && !mfa.webauthn_assertion && ref) {
        const res = await dispatch(performAuthentication(webauthn_challenge));
        if (performAuthentication.fulfilled.match(res)) {
          // Send response from security key to backend
          fetchMfaAuth({ ref: ref, this_device: this_device, webauthn_response: res.payload });
        }
        if (props.setActive) props.setActive(false);
      }
    } else {
      const webauthn_challenge = props.webauthn.webauthn_options;
      if (webauthn_challenge && !webauthn_assertion) {
        const response = await dispatch(performAuthentication(webauthn_challenge));
        if (performAuthentication.fulfilled.match(response)) {
          resetPasswordContext.resetPasswordService.send({ type: "CHOOSE_SECURITY_KEY" });
        }
        if (props.setActive) props.setActive(false);
      }
    }
  }

  async function fetchAuthnChallenge() {
    if (ref) {
      if (!mfa.webauthn_challenge) {
        const response = await fetchMfaAuth({ ref: ref });
        if (response.isSuccess) {
          startTokenAssertion(response.data.payload.webauthn_options);
        }
      } else startTokenAssertion(mfa.webauthn_challenge);
    }
  }

  useEffect(() => {
    if (location.pathname.includes("login")) {
      fetchAuthnChallenge();
    } else handleResetPWSecurityKey();
  }, []);

  //Reset password
  function handleResetPWSecurityKey() {
    dispatch(resetPasswordSlice.actions.selectExtraSecurity("securityKey"));
    startTokenAssertion();
    dispatch(clearNotifications());
  }

  return (
    <Fragment>
      <div className="button-pair selected">
        <h3>
          <FormattedMessage
            description="login this device, security key button"
            defaultMessage="This Device / Security key"
          />
        </h3>
      </div>
      <div className="button-pair bottom">
        <img src={SecurityKeyGif} alt="animation of Security Key inserted into computer" />
      </div>
    </Fragment>
  );
}
