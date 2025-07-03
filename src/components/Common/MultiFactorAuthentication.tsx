import { bankIDApi } from "apis/eduidBankid";
import { eidasApi, WebauthnMethods } from "apis/eduidEidas";
import { ActionStatus, CredentialType, securityApi } from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import UseSecurityKeyToggle from "components/Dashboard/UseSecurityKeyToggle";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppRootState } from "eduid-init-app";
import { createCredential } from "helperFunctions/navigatorCredential";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router";
import authnSlice from "slices/Authn";
import BankIdFlag from "../../../img/flags/BankID_logo.svg";
import EuFlag from "../../../img/flags/EuFlag.svg";
import FrejaFlag from "../../../img/flags/FOvalIndigo.svg";
import passKey from "../../../img/pass-key.svg";
import securityKey from "../../../img/security-key.svg";
import ConfirmModal from "./ConfirmModal";
import NotificationModal from "./NotificationModal";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

interface SecurityKeyTable {
  readonly wrapperRef: React.RefObject<HTMLElement | null>;
  readonly handleVerificationWebauthnToken: (token: string, method: WebauthnMethods) => Promise<void>;
}

export function filterTokensFromCredentials(state: EduIDAppRootState): Array<CredentialType> {
  // get FIDO tokens from list of all user credentials
  return state.security.credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );
}

export function MultiFactorAuthentication(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector((state) => state.security.credentials);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const [showSecurityKeyNameModal, setShowSecurityKeyNameModal] = useState(false);
  const [showVerifyWebauthnModal, setShowVerifyWebauthnModal] = useState(false);
  const [tokenKey, setTokenKey] = useState<any>();
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const wrapperRef = useRef<HTMLElement | null>(null);
  const [ requestCredentials ] = securityApi.useLazyRequestCredentialsQuery();
  const [ beginRegisterWebauthn ] = securityApi.useLazyBeginRegisterWebauthnQuery();
  const [ registerWebauthn ] = securityApi.useLazyRegisterWebauthnQuery();
  const [ getAuthnStatus ] = securityApi.useLazyGetAuthnStatusQuery();
  const [ bankIDVerifyCredential ] = bankIDApi.useLazyBankIDVerifyCredentialQuery();
  const [ eidasVerifyCredential ] = eidasApi.useLazyEidasVerifyCredentialQuery()

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
    (async () => {
      if (authn?.response?.frontend_action === "addSecurityKeyAuthn" && authn?.response?.frontend_state) {
        // call requestCredentials once app is loaded
        setShowSecurityKeyNameModal(true);
      }
    })();
  }, [isLoaded, authn]);

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

  async function handleVerificationWebauthnToken(token: string, method: WebauthnMethods) {
    const verifyAction = tokenTypeMap[method];
    const response = await 
      verifyAction({
        credential_id: token,
        method,
      });
    if (response.isSuccess) {
      if (response.data.payload.location) {
        window.location.assign(response.data.payload.location);
      }
    } else if (response.isError) {
      const VerifyCredentialResponse: any = response;
      setShowVerifyWebauthnModal(false);
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "verifyCredential",
          frontend_state: JSON.stringify({
            method,
            credential: token,
            description: VerifyCredentialResponse?.payload?.payload?.credential_description,
          }),
        })
      );
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
          const registration = await beginRegisterWebauthn({ authenticator: frontend_state })
          if (registration.isSuccess) {
            const credential = await dispatch(createCredential(registration.data.payload.registration_data));
            if (createCredential.fulfilled.match(credential)) {
              const response = await registerWebauthn({ webauthn_attestation: credential.payload, description})
              wrapperRef?.current?.focus();
              if (response.isSuccess) {
                setShowVerifyWebauthnModal(true);
              }
            }
          }
          dispatch(authnSlice.actions.setAuthnFrontendReset());
          setIsRegisteringAuthenticator(false);
        }
      } catch (err) {}
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
            defaultMessage={`Add a token as a second factor of authentication, beyond username and password,
                  to prove you are the owner of your eduID. For example a token can be a security key or your device.`}
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
                  defaultMessage="The device you are currently using"
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
                <FormattedMessage description="platform authn key help text" defaultMessage="USB Security Key." />
              </p>
            </div>
          </div>
        </section>
      </article>
      <SecurityKeyTable wrapperRef={wrapperRef} handleVerificationWebauthnToken={handleVerificationWebauthnToken} />

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
      {/* Verify WebauthnToken Modal */}
      <dialog
        open={showVerifyWebauthnModal}
        id="verify-webauthn-token-modal"
        tabIndex={-1}
        aria-hidden="true"
        data-backdrop="true"
      >
        <div className={showVerifyWebauthnModal ? "modal fade show" : "modal"} tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  <FormattedMessage
                    defaultMessage="Verify your added security key"
                    description="verify webauthn token modal title"
                  />
                </h4>
                <EduIDButton
                  id={`verify-webauthn-token-modal-close-button`}
                  buttonstyle="close float-right"
                  onClick={() => setShowVerifyWebauthnModal(false)}
                ></EduIDButton>
              </div>
              <div className="modal-body">
                <FormattedMessage
                  description="verify webauthn token modal body text"
                  defaultMessage="Please click either the BankID, Freja+ or eIDAS button to verify your security key"
                />
                <p className="help-text">
                  <FormattedMessage
                    description="verify webauthn token modal body note text"
                    defaultMessage={`Note: your added security keys can also be verified from the "Manage your security keys" table.`}
                  />
                </p>
              </div>
              <div className="modal-footer">
                <div className="buttons">
                  <EduIDButton
                    id={`verify-webauthn-token-modal-continue-bankID-button`}
                    buttonstyle="primary icon"
                    onClick={() => handleVerificationWebauthnToken(tokenKey, "bankid")}
                  >
                    <img className="circle-icon bankid-icon" height="20" alt="BankID" src={BankIdFlag} />
                    <span>BankID</span>
                  </EduIDButton>
                  <EduIDButton
                    buttonstyle="primary icon"
                    id={`verify-webauthn-token-modal-continue-frejaID-button`}
                    onClick={() => handleVerificationWebauthnToken(tokenKey, "freja")}
                  >
                    <img className="freja" height="20" alt="Freja+" src={FrejaFlag} />
                    <span>Freja+</span>
                  </EduIDButton>
                  <EduIDButton
                    buttonstyle="primary icon"
                    id={`verify-webauthn-token-modal-continue-eidas-button`}
                    onClick={() => handleVerificationWebauthnToken(tokenKey, "eidas")}
                  >
                    <img className="freja" height="20" alt="eIDAS" src={EuFlag} />
                    <span>eidas</span>
                  </EduIDButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

function SecurityKeyTable({ wrapperRef, handleVerificationWebauthnToken }: SecurityKeyTable) {
  const credentialKey = useRef<string | null>(null);
  const authn = useAppSelector((state) => state.authn);
  let btnVerify;
  let date_success;
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => {
    return filterTokensFromCredentials(state);
  });
  const [showConfirmRemoveSecurityKeyModal, setShowConfirmRemoveSecurityKeyModal] = useState(false);
  const [removeWebauthnToken] = securityApi.useLazyRemoveWebauthnTokenQuery();
  const [getAuthnStatus] = securityApi.useLazyGetAuthnStatusQuery();

  // Runs after re-auth security zone
  useEffect(() => {
    (async () => {
      if (authn?.response?.frontend_action === "removeSecurityKeyAuthn" && authn.response.frontend_state) {
        // call requestCredentials once app is loaded
        credentialKey.current = authn?.response?.frontend_state;
        handleRemoveWebauthnToken();
        dispatch(authnSlice.actions.setAuthnFrontendReset());
      } else if (authn?.response?.frontend_action === "verifyCredential" && authn.response.frontend_state) {
        const parsedFrontendState = authn.response.frontend_state && JSON.parse(authn.response.frontend_state);
        await handleVerificationWebauthnToken(
          parsedFrontendState.credential,
          parsedFrontendState.method as WebauthnMethods
        );
      }
    })();
  }, [authn?.response?.frontend_action]);

  async function handleConfirmDeleteModal(cred: CredentialType) {
    credentialKey.current = JSON.stringify({ credential: cred.key, description: cred.description });
    // Test if the user can directly execute the action or a re-auth security zone will be required
    // If no re-auth is required, then show the modal to confirm the removal
    // else show the re-auth modal and do now show the confirmation modal (show only 1 modal)
    const response = await getAuthnStatus({ frontend_action: "removeSecurityKeyAuthn" });
    if (response.isSuccess && response.data.payload.authn_status === ActionStatus.OK) {
      setShowConfirmRemoveSecurityKeyModal(true);
    } else {
      handleRemoveWebauthnToken();
    }
  }

  async function handleRemoveWebauthnToken() {
    setShowConfirmRemoveSecurityKeyModal(false);
    const parsedFrontendState = credentialKey.current && JSON.parse(credentialKey.current);
    const response = await removeWebauthnToken({ credential_key: parsedFrontendState.credential as string });
    if (response.isSuccess) {
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "removeSecurityKeyAuthn",
          frontend_state: JSON.stringify(parsedFrontendState),
        })
      );
    } else {
      wrapperRef?.current?.focus();
    }
  }

  // data that goes onto the table
  const securityKeyData = !tokens.length ? (
    <figure>
      <em className="help-text">
        <FormattedMessage
          description="no security key has been added"
          defaultMessage="No security key has been added"
        />
      </em>
    </figure>
  ) : (
    tokens.map((cred: CredentialType) => {
      // date created
      const date_created = cred.created_ts.slice(0, "YYYY-MM-DD".length);
      // date last used
      if (cred.success_ts) {
        date_success = cred.success_ts.slice(0, "YYYY-MM-DD".length);
      } else {
        date_success = <FormattedMessage description="security last used date" defaultMessage="Never used" />;
      }

      // verify button/ verified badge
      if (cred.verified) {
        btnVerify = (
          <div aria-label="verification status" className="verified">
            <span>
              <FormattedMessage description="security key status" defaultMessage="Verification status:" />
              &nbsp;
              <strong>
                <FormattedMessage description="security verified" defaultMessage="verified" />
              </strong>
            </span>
          </div>
        );
      } else {
        btnVerify = (
          <div aria-label="verify with freja or bankID">
            <span>
              <FormattedMessage description="security key status" defaultMessage="Verify with: " />
              &nbsp;
              <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "bankid")}>
                BankID
              </EduIDButton>
              <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "freja")}>
                Freja+
              </EduIDButton>
              <EduIDButton buttonstyle="link sm" onClick={() => handleVerificationWebauthnToken(cred.key, "eidas")}>
                Eidas
              </EduIDButton>
            </span>
          </div>
        );
      }

      return (
        <figure
          key={cred.key}
          ref={wrapperRef}
          tabIndex={0}
          className={`webauthn-token-holder ${cred.verified ? "verified" : ""}`}
          data-token={cred.key}
        >
          <div>
            <span aria-label="key name">
              <FormattedMessage description="security description name" defaultMessage="Name:" />
              &nbsp;
              <strong>{cred.description}</strong>
            </span>
            <EduIDButton
              aria-label="Remove"
              id="remove-webauthn"
              buttonstyle="remove sm"
              onClick={() => handleConfirmDeleteModal(cred)}
            ></EduIDButton>
          </div>
          <div>
            <span aria-label="date created">
              <FormattedMessage description="security creation date" defaultMessage="Created:" />
              &nbsp;
              <wbr />
              {date_created}
            </span>

            <span aria-label="date used">
              <FormattedMessage description="security last used" defaultMessage="Used:" />
              &nbsp;
              <wbr />
              {date_success}
            </span>
          </div>
          {btnVerify}
        </figure>
      );
    })
  );

  return (
    // unique ID to scroll to the correct section
    <article id="manage-security-keys">
      <h2>
        <FormattedMessage description="manage your tokens" defaultMessage="Manage your security keys" />
      </h2>
      {Boolean(tokens.length) && <UseSecurityKeyToggle />}
      {securityKeyData}
      <NotificationModal
        id="remove-security-key"
        title={
          <FormattedMessage
            defaultMessage="Remove security key"
            description="settings.remove_security_key_modal_title"
          />
        }
        mainText={
          <FormattedMessage
            defaultMessage={`Are you sure you want to remove your security key?`}
            description="delete.remove_security_key_modal_text"
          />
        }
        showModal={showConfirmRemoveSecurityKeyModal}
        closeModal={() => setShowConfirmRemoveSecurityKeyModal(false)}
        acceptModal={handleRemoveWebauthnToken}
        acceptButtonText={<FormattedMessage defaultMessage="Confirm" description="delete.confirm_button" />}
      />
    </article>
  );
}
