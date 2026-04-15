import { createSelector } from "@reduxjs/toolkit";
import { CredentialType } from "apis/eduidSecurity";
import signupApi from "apis/eduidSignup";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import ConfirmModal from "components/Common/ConfirmModal";
import EduIDButton from "components/Common/EduIDButton";
import { EduIDAppRootState } from "eduid-init-app";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React, { Fragment, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
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
  const [startRegisterWebauthn] = signupApi.useLazyStartRegisterWebauthnQuery();
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<PublicKeyCredentialCreationOptionsJSON | null>(null);
  const [signupRegisterWebauthn] = signupApi.useLazySignupRegisterWebauthnQuery();
  const [createCredential] = navigatorCredentialsApi.useLazyCreateCredentialQuery();
  const intl = useIntl();

  const placeholder = intl.formatMessage({
    id: "security.placeholder",
    defaultMessage: "describe your security key",
    description: "placeholder text for security key description input",
  });

  const handleStopAskingWebauthnDescription = useCallback(() => {
    setShowSecurityKeyNameModal(false);
  }, []);

  const handleStartWebauthnRegistration = useCallback(
    (values: { [key: string]: string }) => {
      (async () => {
        try {
          const description_value = values["describe-webauthn-token-modal"];
          const description = description_value?.trim();
          setShowSecurityKeyNameModal(false);
          if (!registrationData) return;
          const createResponse = await createCredential(registrationData);
          if (createResponse.isSuccess) {
            await signupRegisterWebauthn({
              webauthn_attestation: createResponse.data,
              description,
            });
          }
        } catch (error) {
          console.error("Error creating credentials:", error);
        }
      })();
    },
    [createCredential, signupRegisterWebauthn, registrationData],
  );

  return (
    <Fragment>
      <article id="add-two-factor">
        <div className="flex-between baseline">
          <h2>
            <FormattedMessage description="security key title" defaultMessage="Add multi-factor Authentication (MFA)" />
          </h2>
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
                  const result = await startRegisterWebauthn({ authenticator: "platform" });
                  if (result.isSuccess) {
                    setRegistrationData(result.data.payload.registration_data.publicKey);
                    setShowSecurityKeyNameModal(true);
                  }
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
              {/* {!isPlatformAuthenticatorAvailable && (
              <p className="help-text black">
                <FormattedMessage
                  description="platform authn device error text"
                  defaultMessage="*Your device is not compatible."
                />
              </p>
            )} */}
            </div>
            <div>
              <EduIDButton
                id="security-webauthn-button"
                buttonstyle="primary icon"
                onClick={async () => {
                  const result = await startRegisterWebauthn({ authenticator: "cross-platform" });
                  console.log("startRegisterWebauthn result", result);
                  if (result.isSuccess) {
                    setRegistrationData(result.data.payload.registration_data.publicKey);
                    setShowSecurityKeyNameModal(true);
                  }
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
      <ConfirmModal
        id="describe-webauthn-token-modal"
        title={
          <FormattedMessage
            description="security webauthn describe title"
            defaultMessage="Add a name for your security key"
          />
        }
        mainText={
          <p>
            <FormattedMessage
              description="security webauthn describe paragraph"
              defaultMessage={`Note: this is only for your own use to be able to distinguish between your added keys.`}
            />
          </p>
        }
        placeholder={placeholder}
        showModal={showSecurityKeyNameModal}
        closeModal={handleStopAskingWebauthnDescription}
        handleConfirm={handleStartWebauthnRegistration}
        modalFormLabel={
          <FormattedMessage description="security webauthn credential type" defaultMessage="Security key" />
        }
        validationPattern={securityKeyPattern}
        validationError="security.description_invalid_format"
        helpBlock={
          <FormattedMessage defaultMessage="max 50 characters" description="Help text for security key max length" />
        }
      />
    </Fragment>
  );
}
