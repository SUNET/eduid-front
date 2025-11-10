import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { useAppDispatch } from "eduid-hooks";
import { Fragment, useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { clearNotifications } from "slices/Notifications";
import passkeyImage from "../../../img/multiple-passkey-options.svg";
import passkeyIcon from "../../../img/passkey.svg";
import EduIDButton from "./EduIDButton";

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

export function PassKey(props: Readonly<SecurityKeyProps>): React.JSX.Element {
  // The PassKey button is 'active' after first being pressed. In that mode, it shows
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
    <SecurityKeyInactive
      disabled={!!props.disabled}
      useSecurityKey={useSecurityKey}
      discoverable={props.discoverable}
    />
  );
}

function SecurityKeyInactive(props: Readonly<InactiveSecurityKeyProps>): React.JSX.Element {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (ref.current) ref?.current?.focus();
  }, []);

  return (
    <Fragment>
      <div className="status-box">
        <div className="text-wrapper">
          <h3>
            <FormattedMessage defaultMessage="Faster and safer way to authenticate" description="passkey heading" />
          </h3>
          <div className="flex-between">
            <p>
              <FormattedMessage
                defaultMessage="You can log in securely with your passkey 
using your fingerprint, face recognition or other screen-lock methods. {howPasskeyWork}"
                description="security zone redirect info"
                values={{
                  howPasskeyWork: (
                    <a className="text-link" href="https://www.eduid.se/help" target="_blank">
                      <FormattedMessage description="passkey help text link" defaultMessage="How passkeys work" />
                    </a>
                  ),
                }}
              />
            </p>

            <img src={passkeyImage} alt="Passkey icon" className="passkey-image" />
          </div>
        </div>
        <EduIDButton
          ref={ref}
          buttonstyle="primary icon"
          type="submit"
          onClick={() => {
            props.useSecurityKey();
          }}
          id="pass-key"
          disabled={props.disabled}
        >
          <img className="qr-icon" height="20" alt="qr icon" src={passkeyIcon} />
          <FormattedMessage description="login passkey primary option button" defaultMessage="Continue with passkey" />
        </EduIDButton>
      </div>
    </Fragment>
  );
}
