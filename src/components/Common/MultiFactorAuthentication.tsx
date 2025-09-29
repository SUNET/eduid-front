import { createSelector } from "@reduxjs/toolkit";
import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, WebauthnMethods } from "apis/eduidEidas";
import { ActionStatus, CredentialType, securityApi } from "apis/eduidSecurity";
import { navigatorCredentialsApi } from "apis/navigatorCredentials";
import EduIDButton from "components/Common/EduIDButton";
import { SecurityKeyTable } from "components/Dashboard/SecurityKeyTable";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppRootState } from "eduid-init-app";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router";
import authnSlice from "slices/Authn";
import passKey from "../../../img/pass-key.svg";
import securityKey from "../../../img/security-key.svg";
import ConfirmModal from "./ConfirmModal";
import { VerifyCredentialModal } from "./VerifyCredentialModal";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

const selectCredentials = (state: EduIDAppRootState) => state.security.credentials;

export const filterTokensFromCredentials = createSelector([selectCredentials], (credentials): CredentialType[] =>
  credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  )
);

export function MultiFactorAuthentication(): React.ReactElement | null {
  let return_handled = false;
  const dispatch = useAppDispatch();
  const credentials = useAppSelector((state) => state.security.credentials);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [showVerifyWebauthnModal, setShowVerifyWebauthnModal] = useState(false);
  const [tokenKey, setTokenKey] = useState<string>();
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [requestCredentials] = securityApi.useLazyRequestCredentialsQuery();
  const [beginRegisterWebauthn] = securityApi.useLazyBeginRegisterWebauthnQuery();
  const [registerWebauthn] = securityApi.useLazyRegisterWebauthnQuery();
  const [getAuthnStatus] = securityApi.useLazyGetAuthnStatusQuery();
  const [bankIDVerifyCredential] = bankIDApi.useLazyBankIDVerifyCredentialQuery();
  const [eidasVerifyCredential] = eidasApi.useLazyEidasVerifyCredentialQuery();
  const [createCredential] = navigatorCredentialsApi.useLazyCreateCredentialQuery();
  const [removeWebauthnToken] = securityApi.useLazyRemoveWebauthnTokenQuery();

  const tokens = useAppSelector((state) => {
    return filterTokensFromCredentials(state);
  });

  const authn = useAppSelector((state) => state.authn);
  const [isRegisteringAuthenticator, setIsRegisteringAuthenticator] = useState(false);

  useEffect(() => {
    if (tokens.length > 0 && tokenKey !== tokens[tokens.length - 1].key) {
      setTokenKey(tokens[tokens.length - 1].key);
    }
  }, [tokens]);

  // Runs after re-auth security zone
  useEffect(() => {
    if (return_handled) {
      return;
    }

    return_handled = true;

    (async () => {
      if (authn?.response?.frontend_action === "addSecurityKeyAuthn" && authn?.response?.frontend_state) {
        setShowSecurityKeyNameModal(true);
      } else if (authn?.response?.frontend_action === "removeSecurityKeyAuthn" && authn.response.frontend_state) {
        handleRemoveWebauthnToken(authn.response.frontend_state);
        dispatch(authnSlice.actions.setAuthnFrontendReset());
      } else if (authn?.response?.frontend_action === "verifyCredential" && authn.response.frontend_state) {
        const parsedFrontendState = authn.response.frontend_state && JSON.parse(authn.response.frontend_state);
        await handleVerificationWebauthnToken(
          parsedFrontendState.credential,
          parsedFrontendState.method as WebauthnMethods
        );
      }
    })();
  }, [authn?.response?.frontend_action, authn?.response?.frontend_state]);

  useEffect(() => {
    (async () => {
      if (isLoaded && !credentials.length) {
        // call requestCredentials once app is loaded
        const response = await requestCredentials();
        if (response.isSuccess) {
          wrapperRef?.current?.focus();
        }
      }
    })();
  }, [isLoaded]);

  useEffect(
    () => {
      // Check if platform authentication is available through the navigator.credentials API.
      // Disable the spinner when we know the answer.

      let aborted = false; // flag to avoid updating unmounted components after this promise resolves

      let platform = false;
      if (window.PublicKeyCredential) {
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
          .then((available) => {
            platform = available;
          })
          .catch((err) => {
            console.log(err, "Couldn't detect presence of a webauthn platform authenticator.");
          })
          .finally(() => {
            if (!aborted) {
              setIsPlatformAuthenticatorAvailable(platform);
              // don´t show content until isPlatformAuthLoaded updates to true
              setIsPlatformAuthLoaded(true);
            }
          });
      } else {
        if (!aborted) {
          setIsPlatformAuthLoaded(true);
        }
      }

      // create a cleanup function that will allow the async code above to realise it shouldn't
      // try to update state on an unmounted react component
      return () => {
        aborted = true;
      };
    },
    [] // run this only once
  );

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "security.placeholder",
    defaultMessage: "describe your security key",
    description: "placeholder text for security key description input",
  });

  const tokenTypeMap = {
    freja: eidasVerifyCredential,
    bankid: bankIDVerifyCredential,
    eidas: eidasVerifyCredential,
  };

  async function handleVerificationWebauthnToken(token: string | undefined, method: WebauthnMethods) {
    const verifyAction = tokenTypeMap[method];
    if (!token) {
      console.error("No token provided");
      return;
    }
    const response = await verifyAction({
      credential_id: token,
      method,
    });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    } else if (response.isError) {
      setShowVerifyWebauthnModal(false);
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "verifyCredential",
          frontend_state: JSON.stringify({
            method,
            credential: token,
            description: response.data?.payload.credential_description,
          }),
        })
      );
    }
  }

  async function handleRemoveWebauthnToken(credential_string?: string) {
    const credential_key = credential_string && JSON.parse(credential_string).credential;
    const response = await removeWebauthnToken({ credential_key: credential_key });
    if (response.isError) {
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "removeSecurityKeyAuthn",
          frontend_state: credential_key,
        })
      );
    } else {
      wrapperRef?.current?.focus();
    }
  }

  function handleStopAskingWebauthnDescription() {
    setIsRegisteringAuthenticator(false);
    setShowSecurityKeyNameModal(false);
  }

  // buttons "My Device" or "My security key"
  async function handleRegisterWebauthn(authType: string) {
    setIsRegisteringAuthenticator(true);

    // prepare for authenticate() / AuthenticateModal
    dispatch(
      authnSlice.actions.setFrontendActionAndState({
        frontend_action: "addSecurityKeyAuthn",
        frontend_state: authType,
      })
    );

    const response = await getAuthnStatus({ frontend_action: "addSecurityKeyAuthn" });
    if (response.isSuccess && response.data.payload.authn_status === ActionStatus.OK) {
      setIsRegisteringAuthenticator(true);
      setShowSecurityKeyNameModal(true);
    } else {
      setIsRegisteringAuthenticator(false);
      dispatch(authnSlice.actions.setReAuthenticate(true));
    }
  }

  // function that is called when the user clicks OK in the "security key name" modal
  function handleStartWebauthnRegistration(values: { [key: string]: string }) {
    const frontend_state = authn.frontend_state || authn?.response?.frontend_state;
    (async () => {
      try {
        if (frontend_state) {
          const description_value = values["describe-webauthn-token-modal"];
          const description = description_value?.trim();
          setShowSecurityKeyNameModal(false);
          const registration = await beginRegisterWebauthn({ authenticator: frontend_state });
          if (registration.isSuccess) {
            const createResponse = await createCredential(registration.data.payload.registration_data.publicKey);
            if (createResponse.isSuccess) {
              const registerResponse = await registerWebauthn({
                webauthn_attestation: createResponse.data,
                description,
              });
              wrapperRef?.current?.focus();
              if (registerResponse.isSuccess) {
                setShowVerifyWebauthnModal(true);
              }
            }
          }
          dispatch(authnSlice.actions.setAuthnFrontendReset());
          setIsRegisteringAuthenticator(false);
        }
      } catch (error) {
        console.error("Error creating credentials:", error);
      }
    })();
  }

  if (!isPlatformAuthLoaded) return null;
  return (
    <>
      <article id="add-two-factor">
        <h2>
          <FormattedMessage description="security key title" defaultMessage="Two-factor Authentication (2FA)" />
        </h2>
        <p>
          <FormattedMessage
            description="security second factor"
            defaultMessage={`If possible add a security key as a second factor of authentication, beyond username and password, 
              to prove you are the owner of your eduID. Examples are separate physical USB security keys, or built-in features on your device such as mobile phone or laptop computer.`}
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
            defaultMessage={`You can read more about security keys in the Help section: {HelpSecurityKeys}.`}
            values={{
              HelpSecurityKeys: (
                <Link className="text-link" to={`../../../help`} target="_blank">
                  <FormattedMessage
                    description="about security key - handle"
                    defaultMessage="Improving the security level of eduID"
                  />
                </Link>
              ),
            }}
          />
        </p>
        <section className="top-spacing">
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
                onClick={() => handleRegisterWebauthn("platform")}
                disabled={!isPlatformAuthenticatorAvailable || isRegisteringAuthenticator}
              >
                <img className="pass-key-icon" height="25" alt="pass key icon" src={passKey} />
                <FormattedMessage description="add webauthn token device" defaultMessage="this device" />
              </EduIDButton>
              <p className="help-text">
                <FormattedMessage
                  description="platform authn device help text"
                  defaultMessage="The device you are currently using."
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
                onClick={() => handleRegisterWebauthn("cross-platform")}
                disabled={isRegisteringAuthenticator}
              >
                <img className="security-key-icon" height="25" alt="security key icon" src={securityKey} />
                <FormattedMessage description="add webauthn token key" defaultMessage="security key" />
              </EduIDButton>
              <p className="help-text">
                <FormattedMessage
                  description="platform authn key help text"
                  defaultMessage="E.g a USB Security Key you are using."
                />
              </p>
            </div>
          </div>
        </section>
      </article>
      <SecurityKeyTable
        wrapperRef={wrapperRef}
        handleVerificationWebauthnToken={handleVerificationWebauthnToken}
        handleRemoveWebauthnToken={handleRemoveWebauthnToken}
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
      <VerifyCredentialModal
        showVerifyWebauthnModal={showVerifyWebauthnModal}
        setShowVerifyWebauthnModal={setShowVerifyWebauthnModal}
        handleVerificationWebauthnToken={() => handleVerificationWebauthnToken}
        tokenKey={tokenKey!}
      />
    </>
  );
}
