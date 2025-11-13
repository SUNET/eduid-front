import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { useAppDispatch } from "eduid-hooks";
import { Fragment, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import SecurityKeyGif from "../../../img/computer_animation.gif";

interface SecurityKeyProps {
  disabled?: boolean;
  setup(): Promise<PublicKeyCredentialRequestOptionsJSON | undefined>;
  onSuccess(publicKeyCredential: PublicKeyCredentialJSON): void;
  discoverable?: boolean;
}

interface InactiveSecurityKeyProps {
  disabled?: boolean;
  useSecurityKey(): void;
  discoverable?: boolean;
}

export function SecurityKey(props: Readonly<SecurityKeyProps>): React.JSX.Element {
  // The SecurityKey button is 'active' after first being pressed. In that mode, it shows
  // a small animation and invokes the navigator.credentials.get() thunk that will result
  // in 'fulfilled' after the user uses the security key to authenticate. The 'active' mode
  // can also be cancelled or restarted with buttons in the UI.
  const dispatch = useAppDispatch();
  const [active, setActive] = useState(false);
  const [performAuthentication] = navigatorCredentialsApi.useLazyPerformAuthenticationQuery();

  async function useSecurityKey() {
    setActive(true);
    const webauth_options = await props.setup();
    if (webauth_options) {
      const response = await performAuthentication({ webauth_options });
      if (response.isSuccess) {
        props.onSuccess(response.data);
        dispatch(clearNotifications());
      }
    }
    setActive(false);
  }

  return (
    <div className="option-wrapper">
      <div className="option">
        {active ? (
          <SecurityKeyActive />
        ) : (
          <SecurityKeyInactive disabled={!!props.disabled} useSecurityKey={useSecurityKey} />
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

function SecurityKeyInactive(props: Readonly<InactiveSecurityKeyProps>): React.JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) ref?.current?.focus();
  }, []);

  return (
    <Fragment>
      <h3>
        <FormattedMessage description="login this device, security key button" defaultMessage="Security key" />
      </h3>
      <p className="help-text">
        {props.discoverable ? (
          <FormattedMessage
            description="passkey authn help text"
            defaultMessage="E.g. Passkey on your USB Security Key or with the device you are currently using."
          />
        ) : (
          <FormattedMessage
            description="platform authn help text"
            defaultMessage="E.g. USB Security Key or passkey with the device you are currently using."
          />
        )}
      </p>
      {/* TODO: Use EduIDButton component after removing Reactstrap Button */}
      <button
        ref={ref}
        className="primary"
        type="submit"
        onClick={() => {
          props.useSecurityKey();
        }}
        id="mfa-security-key"
        disabled={props.disabled}
      >
        <FormattedMessage description="login mfa primary option button" defaultMessage="Use security key" />
      </button>
    </Fragment>
  );
}

function SecurityKeyActive(): React.JSX.Element {
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
