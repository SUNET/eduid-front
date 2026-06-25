import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loginApi } from "apis/eduidLogin";
import signupApi from "apis/eduidSignup";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import { EduIDButton } from "components/Common/EduIDButton";
import { useTheme } from "components/Common/ThemeContext";
import { WebauthnDescriptionModal } from "components/Common/WebauthnDescriptionModal";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { signupSlice } from "slices/Signup";
import "spin.js/spin.css"; // without this import, the spinner is frozen
import passkeyDarkImage from "../../../img/multiple-passkey-dark-mode.svg";
import passkeyImage from "../../../img/multiple-passkey.svg";
import passKey from "../../../img/pass-key.svg";
import securityKey from "../../../img/security-key.svg";
import { ServiceInfo } from "./SignupEntry";
import { SignupStepIndicator } from "./SignupStepIndicator";
import { handleCreateUserError, SignupConfirmPassword } from "./SignupUserCreated";

type PasswordRequirement = "default" | "optional" | "required";

const PasswordSection = (props: { requirement: PasswordRequirement }) => {
  const [isEditMode, setEditMode] = useState<boolean>(false);
  return (
    <Fragment>
      <div className="or-container">
        <div className="line"></div>
        <span>
          {props.requirement === "default" && (
            <FormattedMessage defaultMessage="or use a password instead" description="Default signup option" />
          )}
          {props.requirement === "optional" && (
            <FormattedMessage defaultMessage="you can also add a password" description="Alternative signup option" />
          )}
          {props.requirement === "required" && (
            <FormattedMessage
              defaultMessage="a password is required for this key"
              description="Required password option"
            />
          )}
        </span>
        <div className="line"></div>
      </div>
      <section className="register-password" id="register-password">
        <div className="heading">
          <h2>
            <FormattedMessage description="register a password" defaultMessage="Register a password" />
          </h2>
          <EduIDButton buttonstyle="link sm txt-toggle-btn" onClick={() => setEditMode(!isEditMode)}>
            {isEditMode ? (
              <Fragment>
                <FormattedMessage description="hide form button" defaultMessage="hide form" />
                &nbsp;
                <FontAwesomeIcon icon={faChevronUp} />
              </Fragment>
            ) : (
              <Fragment>
                <FormattedMessage description="show form button" defaultMessage="show form" />
                &nbsp;
                <FontAwesomeIcon icon={faChevronDown} />
              </Fragment>
            )}
          </EduIDButton>
        </div>
        <p className="text-medium">
          <FormattedMessage
            description="Add password explanation"
            defaultMessage={`Add a password to your account as an alternative sign-in method. Choose between a suggested or user created password.`}
          />
        </p>
        {isEditMode && <SignupConfirmPassword />}
      </section>
    </Fragment>
  );
};

export function SignupCredentials(): React.ReactElement | null {
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
  const [fetchLogout] = loginApi.useLazyFetchLogoutQuery();
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const [getPassword] = signupApi.useLazyGetPasswordRequestQuery();

  const getPasswordRequirement = (): PasswordRequirement => {
    if (!webauthnRegistered) {
      return "default";
    }
    if (webauthnIsDiscoverable) {
      return "optional";
    }
    return "required";
  };

  const passwordRequirement = getPasswordRequirement();

  useEffect(() => {
    if (!signupState?.credentials.generated_password) {
      getPassword();
    }
  }, [getPassword, signupState?.credentials.generated_password]);

  const handleStopAskingWebauthnDescription = useCallback(() => {
    setShowSecurityKeyNameModal(false);
  }, []);

  const handleStartWebauthnRegistration = useCallback(
    (values: { [key: string]: string }) => {
      (async () => {
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
      })();
    },
    [createCredential, signupRegisterWebauthn, registrationData],
  );

  const finishSignup = useCallback(() => {
    (async () => {
      if (webauthnRegistered) {
        const response = await createUser({
          use_webauthn: webauthnRegistered,
        });
        if (response.isSuccess) {
          dispatch(signupSlice.actions.setNextPage("SIGNUP_USER_CREATED"));
        } else if (response.error) {
          handleCreateUserError(response.error, fetchLogout, dispatch);
        }
      }
    })();
  }, [createUser, dispatch, webauthnRegistered, fetchLogout]);

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
    <div className="step-container">
      <section className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Create eduID: Register your sign-in method"
            description="Signup register credentials"
          />
        </h1>
        <ServiceInfo />
        <div className="lead">
          {webauthnRegistered && !webauthnIsDiscoverable ? (
            <p>
              <FormattedMessage
                defaultMessage="A security key has been registered. This type of key also requires a password to sign in."
                description="non-discoverable key needs password"
              />
            </p>
          ) : (
            <p>
              <FormattedMessage
                defaultMessage="Choose between a passkey/security key, password or both."
                description="Signup register credentials lead text"
              />
            </p>
          )}
        </div>
      </section>

      {/* status box for passkey option */}
      <section className="passkey-option">
        {webauthnRegistered ? (
          <Fragment>
            <figure className="signin-details">
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
            {webauthnIsDiscoverable && (
              <div className="buttons">
                <EduIDButton buttonstyle="primary" id="finish-signup" onClick={finishSignup}>
                  <FormattedMessage defaultMessage="Complete creating eduID" description="signup finish button" />
                </EduIDButton>
              </div>
            )}
          </Fragment>
        ) : (
          <Fragment>
            <div className="status-box">
              <div className="text-wrapper">
                <div className="flex-between">
                  <div>
                    <p className="text-medium">
                      <FormattedMessage defaultMessage="We recommend setting up a passkey for fast and secure access to your eduID account." />
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
            <h2 aria-label="select extra webauthn">
              <strong>
                <FormattedMessage description="select extra webauthn" defaultMessage="Register a key:" />
              </strong>
            </h2>
            <div className="mfa-alternative">
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
            </div>
          </Fragment>
        )}
      </section>
      <PasswordSection requirement={passwordRequirement} />
      <WebauthnDescriptionModal
        showModal={showSecurityKeyNameModal}
        closeModal={handleStopAskingWebauthnDescription}
        handleConfirm={handleStartWebauthnRegistration}
      />
      <SignupStepIndicator currentStep={4} />
    </div>
  );
}
