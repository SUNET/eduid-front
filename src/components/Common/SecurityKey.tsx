import { useWebauthnAuthentication } from "components/Hooks/useWebauthnAuthentication";
import { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import SecurityKeyGif from "../../../img/computer_animation.gif";
import { EduIDButton } from "./EduIDButton";

interface SecurityKeyProps {
  disabled?: boolean;
  setup(): Promise<PublicKeyCredentialRequestOptionsJSON | undefined>;
  onSuccess(publicKeyCredential: AuthenticationResponseJSON): void;
  discoverable?: boolean;
}

interface InactiveSecurityKeyProps {
  disabled?: boolean;
  handleSecurityKey(): void;
  discoverable?: boolean;
}

export function SecurityKey({ disabled, setup, onSuccess }: Readonly<SecurityKeyProps>) {
  // The SecurityKey button is 'active' after first being pressed. In that mode, it shows
  // a small animation until the user has used the security key (or cancelled, or the browser
  // timed out). See useWebauthnAuthentication.
  const { active, start: handleSecurityKey } = useWebauthnAuthentication({ setup, onSuccess });

  return (
    <div className="option-wrapper">
      <div className="option">
        {active ? (
          <SecurityKeyActive />
        ) : (
          <SecurityKeyInactive disabled={!!disabled} handleSecurityKey={handleSecurityKey} />
        )}
        {active && (
          <p className="help-text">
            <FormattedMessage
              id="securityKey.hint"
              description="login mfa primary option hint"
              defaultMessage="If your Security Key has a button, don't forget to tap it."
            />
          </p>
        )}
      </div>
    </div>
  );
}

function SecurityKeyInactive({ discoverable, handleSecurityKey, disabled }: Readonly<InactiveSecurityKeyProps>) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) ref?.current?.focus();
  }, []);

  return (
    <>
      <h3>
        <FormattedMessage
          id="common.securityKey"
          description="login this device, security key button"
          defaultMessage="Security key"
        />
      </h3>
      <p className="help-text">
        {discoverable ? (
          <FormattedMessage
            id="securityKey.passkey"
            description="passkey authn help text"
            defaultMessage="E.g. Passkey on your USB Security Key or with the device you are currently using."
          />
        ) : (
          <FormattedMessage
            id="securityKey.platform"
            description="platform authn help text"
            defaultMessage="E.g. USB Security Key or passkey with the device you are currently using."
          />
        )}
      </p>
      <EduIDButton
        ref={ref}
        buttonstyle="primary"
        type="button"
        onClick={handleSecurityKey}
        id="mfa-security-key"
        disabled={disabled}
      >
        <FormattedMessage
          id="securityKey.button"
          description="login mfa primary option button"
          defaultMessage="Use security key"
        />
      </EduIDButton>
    </>
  );
}

function SecurityKeyActive() {
  return (
    <>
      <div className="button-pair selected">
        <h3>
          <FormattedMessage
            id="securityKey.thisDeviceOrKey"
            description="login this device, security key button"
            defaultMessage="This Device / Security key"
          />
        </h3>
      </div>
      <div className="button-pair bottom">
        <img src={SecurityKeyGif} alt="animation of Security Key inserted into computer" />
      </div>
    </>
  );
}
