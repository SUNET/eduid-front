import signupApi from "apis/eduidSignup";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import EduIDButton from "components/Common/EduIDButton";
import { useTheme } from "components/Common/ThemeContext";
import { WebauthnDescriptionModal } from "components/Common/WebauthnDescriptionModal";
import { WizardLink } from "components/Common/WizardLink";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { Fragment, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { signupSlice } from "slices/Signup";
import "spin.js/spin.css"; // without this import, the spinner is frozen
import passkeyDarkImage from "../../../img/multiple-passkey-dark-mode.svg";
import passkeyImage from "../../../img/multiple-passkey.svg";
import passKey from "../../../img/pass-key.svg";
import securityKey from "../../../img/security-key.svg";

export function SignupMFA(): React.ReactElement | null {
  const signupState = useAppSelector((state) => state.signup.state);
  const [startRegisterWebauthn] = signupApi.useLazyStartRegisterWebauthnQuery();
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [registrationData, setRegistrationData] = useState<PublicKeyCredentialCreationOptionsJSON | null>(null);
  const [signupRegisterWebauthn] = signupApi.useLazySignupRegisterWebauthnQuery();
  const [createCredential] = navigatorCredentialsApi.useLazyCreateCredentialQuery();
  const [createUser] = signupApi.useLazyCreateUserRequestQuery();
  const credentials = signupState?.credentials;
  const webauthnRegistered = credentials?.webauthn_registered ?? false;
  const webauthnIsDiscoverable = credentials?.webauthn_is_discoverable ?? false;
  const webauthnDescription = credentials?.webauthn_description;

  const intl = useIntl();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

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
              clientExtensionResults: createResponse.data?.clientExtensionResults,
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

  const handleWebauthnButtonClick = useCallback(
    async (authenticator: "platform" | "cross-platform") => {
      const result = await startRegisterWebauthn({ authenticator });
      if (result.isSuccess) {
        setRegistrationData(result.data.payload.registration_data.publicKey);
        setShowSecurityKeyNameModal(true);
      }
    },
    [startRegisterWebauthn],
  );

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
                  <FormattedMessage defaultMessage="A passkey is a faster and safer way to sign in than with a password. We recommend setting one up for eduID to keep access to your account secure." />
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
                    keyName: <strong> {webauthnDescription}</strong>,
                  }}
                />
              </span>
            </figure>

            {webauthnIsDiscoverable ? (
              <div className="buttons">
                <EduIDButton buttonstyle="primary" id="finish-signup" onClick={finishSignup}>
                  <FormattedMessage defaultMessage="Complete sign up" description="signup finish button" />
                </EduIDButton>
              </div>
            ) : (
              <>
                <div className="buttons">
                  <EduIDButton
                    buttonstyle="primary"
                    id="continue-to-password"
                    onClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIAL_PASSWORD"))}
                  >
                    <FormattedMessage defaultMessage="set a password" description="continue to password button" />
                  </EduIDButton>
                </div>
                <p className="help-text">
                  <FormattedMessage
                    defaultMessage="A password is required to sign in with this key."
                    description="non-discoverable key needs password"
                  />
                </p>
              </>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <span aria-label="select extra webauthn">
              <strong>
                <FormattedMessage description="select extra webauthn" defaultMessage="Add a security key:" />
              </strong>
            </span>
            <div className="buttons">
              <div>
                <EduIDButton
                  id="security-webauthn-platform-button"
                  buttonstyle="primary icon"
                  onClick={() => handleWebauthnButtonClick("platform")}
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
                  onClick={() => handleWebauthnButtonClick("cross-platform")}
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
      {!(webauthnRegistered && !webauthnIsDiscoverable) && (
        <WizardLink
          nextText={
            webauthnRegistered
              ? intl.formatMessage({
                  id: "wizard link also add password",
                  defaultMessage: "Also add a password",
                })
              : intl.formatMessage({
                  id: "wizard link signup with password",
                  defaultMessage: "Sign up with a password",
                })
          }
          nextOnClick={() => dispatch(signupSlice.actions.setNextPage("SIGNUP_CREDENTIAL_PASSWORD"))}
        />
      )}

      <WebauthnDescriptionModal
        showModal={showSecurityKeyNameModal}
        closeModal={handleStopAskingWebauthnDescription}
        handleConfirm={handleStartWebauthnRegistration}
      />
    </Fragment>
  );
}
