import { fetchMfaAuth } from "apis/eduidLogin";
import EduIDButton from "components/Common/EduIDButton";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { performAuthentication } from "helperFunctions/navigatorCredential";
import { Fragment, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import SecurityKeyGif from "../../../img/computer_animation.gif";

export function SecurityKey(): JSX.Element {
  // The SecurityKey button is 'active' after first being pressed. In that mode, it shows
  // a small animation and invokes the navigator.credentials.get() thunk that will result
  // in 'fulfilled' after the user uses the security key to authenticate. The 'active' mode
  // can also be cancelled or restarted with buttons in the UI.
  const [active, setActive] = useState(false);

  return (
    <div className="option-wrapper">
      <div className="option">
        {active ? <SecurityKeyActive setActive={setActive} /> : <SecurityKeyInactive setActive={setActive} />}
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

interface SecurityKeyProps {
  setActive(val: boolean): void;
}

function SecurityKeyInactive({ setActive }: SecurityKeyProps): JSX.Element {
  const authn_options = useAppSelector((state) => state.login.authn_options);

  return (
    <Fragment>
      <h3>
        <FormattedMessage
          description="login this device, security key button"
          defaultMessage="This Device / Security key"
        />
      </h3>
      <p className="help-text">
        <FormattedMessage
          description="platform authn help text"
          defaultMessage="E.g. USB Security Key or the device you are currently using."
        />
      </p>
      <EduIDButton
        buttonstyle="primary"
        type="submit"
        onClick={() => {
          setActive(true);
        }}
        id="mfa-security-key"
        disabled={!authn_options.webauthn}
      >
        <FormattedMessage description="login mfa primary option button" defaultMessage="Use security key" />
      </EduIDButton>
    </Fragment>
  );
}

function SecurityKeyActive({ setActive }: SecurityKeyProps): JSX.Element {
  const mfa = useAppSelector((state) => state.login.mfa);
  const ref = useAppSelector((state) => state.login.ref);
  const dispatch = useAppDispatch();

  async function startTokenAssertion(webauthn_challenge?: string) {
    if (webauthn_challenge && !mfa.webauthn_assertion && ref) {
      const res = await dispatch(performAuthentication(webauthn_challenge));
      if (performAuthentication.fulfilled.match(res)) {
        // Send response from security key to backend
        dispatch(fetchMfaAuth({ ref: ref, webauthn_response: res.payload }));
      }
      setActive(false);
    }
  }

  async function fetchAuthnChallenge() {
    if (ref) {
      if (!mfa.webauthn_challenge) {
        const response = await dispatch(fetchMfaAuth({ ref: ref }));
        if (fetchMfaAuth.fulfilled.match(response)) {
          startTokenAssertion(response?.payload?.webauthn_options);
        }
      } else startTokenAssertion(mfa.webauthn_challenge);
    }
  }

  useEffect(() => {
    fetchAuthnChallenge();
  }, []);

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
