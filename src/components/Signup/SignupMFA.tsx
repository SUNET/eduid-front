import { createSelector } from "@reduxjs/toolkit";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi } from "apis/eduidEidas";
import { frejaeIDApi } from "apis/eduidFrejaeID";
import { CredentialType, securityApi } from "apis/eduidSecurity";
import signupApi from "apis/eduidSignup";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import EduIDButton from "components/Common/EduIDButton";
import { ToolTip } from "components/Common/ToolTip";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppRootState } from "eduid-init-app";
import React, { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router";
import "spin.js/spin.css"; // without this import, the spinner is frozen
import passKey from "../../../img/pass-key.svg";
import securityKey from "../../../img/security-key.svg";

export const FRONTEND_ACTION = "frontend_action";

const selectCredentials = (state: EduIDAppRootState) => state.security.credentials;

export const filterTokensFromCredentials = createSelector([selectCredentials], (credentials): CredentialType[] =>
  credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type",
  ),
);

export function SignupMFA(): React.ReactElement | null {
  const return_handled = useRef(false);
  const dispatch = useAppDispatch();
  const credentials = useAppSelector((state) => state.security.credentials);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  // Start as loaded (true) if WebAuthn API doesn't exist (nothing async to wait for)
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(() => !globalThis.PublicKeyCredential);
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [showVerifyWebauthnModal, setShowVerifyWebauthnModal] = useState(false);
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const [requestCredentials] = securityApi.useLazyRequestCredentialsQuery();
  const [startRegisterWebauthn] = signupApi.useLazyStartRegisterWebauthnQuery();
  const [registerWebauthn] = securityApi.useLazyRegisterWebauthnQuery();
  const [getAuthnStatus] = securityApi.useLazyGetAuthnStatusQuery();
  const [bankIDVerifyCredential] = bankIDApi.useLazyBankIDVerifyCredentialQuery();
  const [eidasVerifyCredential] = eidasApi.useLazyEidasVerifyCredentialQuery();
  const [createCredential] = navigatorCredentialsApi.useLazyCreateCredentialQuery();
  const [frejaeidVerifyCredential] = frejaeIDApi.useLazyFrejaeIDVerifyCredentialQuery();

  return (
    <article id="add-two-factor">
      <div className="flex-between baseline">
        <h2>
          <FormattedMessage description="security key title" defaultMessage="Add multi-factor Authentication (MFA)" />
        </h2>
        <ToolTip />
      </div>

      <p>
        <FormattedMessage
          description="security second factor"
          defaultMessage={`If possible add a security key as a second factor of authentication, beyond username and password, 
              to prove you are the owner of your eduID. Examples are separate physical USB security keys that you can get, or built-in passkey features on your device, such as biometrics or pins.`}
        />
      </p>
      <p className="text-medium">
        <strong>
          <FormattedMessage
            description="security second factor individual"
            defaultMessage={`Note: added security keys are personal and not to be shared with others. This is to ensure that access to your account is limited solely to you, the account holder.`}
          />
        </strong>
      </p>
      <p className="help-text">
        <FormattedMessage
          description="security second factor help info"
          defaultMessage={`You can read more about supported security keys in the Help section: {HelpSecurityKeys}.`}
          values={{
            HelpSecurityKeys: (
              <Link className="text-link" to={`../../../help#help-security-key-button`} target="_blank">
                <FormattedMessage
                  description="about security key - handle"
                  defaultMessage="Improving the security level of eduID"
                />
              </Link>
            ),
          }}
        />
      </p>
      <section className="add-key-section">
        <span aria-label="select extra webauthn">
          <strong>
            <FormattedMessage description="select extra webauthn" defaultMessage="Add a new security key:" />
          </strong>
        </span>

        <div className="buttons">
          <div>
            <EduIDButton
              id="security-webauthn-platform-button"
              buttonstyle="primary icon"
              onClick={async () => {
                await startRegisterWebauthn({ authenticator: "platform" });
              }}
            >
              <img className="pass-key-icon" height="25" alt="pass key icon" src={passKey} />
              <FormattedMessage description="add webauthn token device" defaultMessage="this device" />
            </EduIDButton>
            <p className="help-text">
              <FormattedMessage
                description="platform authn device help text"
                defaultMessage="Internal passkey on your phone or laptop."
              />
            </p>
            {!isPlatformAuthenticatorAvailable && (
              <p className="help-text black">
                <FormattedMessage
                  description="platform authn device error text"
                  defaultMessage="*Your device is not compatible."
                />
              </p>
            )}
          </div>
          <div>
            <EduIDButton
              id="security-webauthn-button"
              buttonstyle="primary icon"
              onClick={async () => {
                await startRegisterWebauthn({ authenticator: "cross-platform" });
              }}
            >
              <img className="security-key-icon" height="25" alt="security key icon" src={securityKey} />
              <FormattedMessage description="add webauthn token key" defaultMessage="security key" />
            </EduIDButton>
            <p className="help-text">
              <FormattedMessage
                description="platform authn key help text"
                defaultMessage="Your external USB security key."
              />
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
