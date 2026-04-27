import { createSelector } from "@reduxjs/toolkit";
import { CredentialType } from "apis/eduidSecurity";
import signupApi from "apis/eduidSignup";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import ConfirmModal from "components/Common/ConfirmModal";
import EduIDButton from "components/Common/EduIDButton";
import { useTheme } from "components/Common/ThemeContext";
import { WizardLink } from "components/Common/WizardLink";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppRootState } from "eduid-init-app";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React, { Fragment, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { signupSlice } from "slices/Signup";
import "spin.js/spin.css"; // without this import, the spinner is frozen
import passkeyDarkImage from "../../../img/multiple-passkey-dark-mode.svg";
import passkeyImage from "../../../img/multiple-passkey.svg";
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
  const signupState = useAppSelector((state) => state.signup.state);
  const [startRegisterWebauthn] = signupApi.useLazyStartRegisterWebauthnQuery();
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<PublicKeyCredentialCreationOptionsJSON | null>(null);
  const [signupRegisterWebauthn] = signupApi.useLazySignupRegisterWebauthnQuery();
  const [createCredential] = navigatorCredentialsApi.useLazyCreateCredentialQuery();
  const [createUser] = signupApi.useLazyCreateUserRequestQuery();

  const webauthnRegistered = signupState?.credentials?.webauthn_registered ?? false;
  const intl = useIntl();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

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
            signupRegisterWebauthn({
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

  const finishSignup = useCallback(() => {
    (async () => {
      try {
        if (webauthnRegistered) {
          const response = await createUser({
            use_webauthn: webauthnRegistered,
          });
          if (response.isSuccess) {
            dispatch(signupSlice.actions.setNextPage("SIGNUP_USER_CREATED"));
          }
        }
      } catch (error) {
        console.error("Error finishing signup:", error);
      }
    })();
  }, [createUser, dispatch, webauthnRegistered]);

  return (
    <Fragment>
      <h1>
        <FormattedMessage
          defaultMessage="Create eduID:  Set up your sign-in method"
          description="Signup register credentials"
        />
      </h1>

      <div className="lead">
        <p>
          <FormattedMessage
            defaultMessage="Choose at least one way to sign in to your eduID account."
            description="Signup register credentials lead text"
          />
        </p>
      </div>

      {/* status box for passkey option */}
      <section className="passkey-option">
        <div className="status-box">
          <div className="text-wrapper">
            <div className="flex-between">
              <div>
                <h2>
                  <FormattedMessage defaultMessage="Faster and safer way to sign in" description="passkey heading" />
                </h2>
                <p className="text-medium">
                  <FormattedMessage defaultMessage="A passkey is a faster and safer way to sign in than a password. We recommend setting one up to keep your account secure." />
                </p>
                <p className="help-text">
                  <FormattedMessage
                    defaultMessage='Read more about passkeys and sign-in methods in the "Using eduID" section in  {helpLink}.'
                    description="signup passkey help link"
                    values={{
                      helpLink: (
                        <a href="/help" target="_blank" rel="noopener noreferrer">
                          <FormattedMessage description="eduID help link" defaultMessage={`eduID Help`} />
                        </a>
                      ),
                    }}
                  />
                </p>
              </div>
              <img
                src={theme === "dark" ? passkeyDarkImage : passkeyImage}
                alt="Passkey images"
                className="passkey-image"
              />
            </div>
          </div>
        </div>
        {webauthnRegistered ? (
          <Fragment>
            <figure>
              <span>
                <FormattedMessage
                  defaultMessage="Your registered security key: {keyName}"
                  description="Signup added credentials label"
                  values={{
                    keyName: <strong> security key</strong>,
                  }}
                />
              </span>
            </figure>

            <div className="buttons">
              <EduIDButton buttonstyle="primary" id="create-account" onClick={() => finishSignup()}>
                <FormattedMessage description="signup create account button" defaultMessage="Finish sign up" />
              </EduIDButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
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
              </div>
              <div>
                <EduIDButton
                  id="security-webauthn-button"
                  buttonstyle="primary icon"
                  onClick={async () => {
                    const result = await startRegisterWebauthn({ authenticator: "cross-platform" });
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
          </Fragment>
        )}
      </section>
      <WizardLink
        nextText={intl.formatMessage({
          id: "wizard link signup with password",
          defaultMessage: "Sign up with a password",
        })}
        nextOnClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIAL_PASSWORD"))}
      />

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
