import { bankIDVerifyCredential } from "apis/eduidBankid";
import { eidasVerifyCredential } from "apis/eduidEidas";
import {
  ActionStatus,
  beginRegisterWebauthn,
  CredentialType,
  getAuthnStatus,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
} from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
import UseSecurityKeyToggle from "components/Dashboard/UseSecurityKeyToggle";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { EduIDAppRootState } from "eduid-init-app";
import { createCredential } from "helperFunctions/navigatorCredential";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import authnSlice from "slices/Authn";
import securitySlice from "slices/Security";
import ConfirmModal from "./ConfirmModal";
import NotificationModal from "./NotificationModal";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

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
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const tokens = useAppSelector((state) => {
    return filterTokensFromCredentials(state);
  });
  const authn = useAppSelector((state) => state.authn);
  const [isRegisteringAuthenticator, setIsRegisteringAuthenticator] = useState(false);

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
        await dispatch(requestCredentials());
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

    const response = await dispatch(getAuthnStatus({ frontend_action: "addSecurityKeyAuthn" }));
    if (getAuthnStatus.fulfilled.match(response) && response.payload.authn_status === ActionStatus.OK) {
      setIsRegisteringAuthenticator(true);
      setShowSecurityKeyNameModal(true);
    } else {
      setIsRegisteringAuthenticator(false);
      dispatch(authnSlice.actions.setReAuthenticate(true));
    }
  }

  // function that is called when the user clicks OK in the "security key name"  modal
  function handleStartWebauthnRegistration(values: { [key: string]: string }) {
    const frontend_state = authn.frontend_state || authn?.response?.frontend_state;
    (async () => {
      try {
        if (frontend_state) {
          dispatch(securitySlice.actions.chooseAuthenticator(frontend_state));
        }
        const description = values["describe-webauthn-token-modal"];
        const descriptionValue = description?.trim();
        setShowSecurityKeyNameModal(false);
        const resp = await dispatch(beginRegisterWebauthn());
        if (beginRegisterWebauthn.fulfilled.match(resp)) {
          const response = await dispatch(createCredential(resp.payload));
          if (createCredential.fulfilled.match(response)) {
            await dispatch(registerWebauthn({ descriptionValue }));
          }
        }
        dispatch(authnSlice.actions.setAuthnFrontendReset());
        setIsRegisteringAuthenticator(false);
      } catch (err) {}
    })();
  }

  if (!isPlatformAuthLoaded) return null;
  return (
    <article id="security-container">
      <div id="register-security-key-container">
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
        <p className="help-text">
          <FormattedMessage
            description="security second factor help info"
            defaultMessage={`You can read more about security keys in the Help section: {HelpSecurityKeys}.`}
            values={{
              HelpSecurityKeys: (
                <Link className="text-link" to={`../../../help`}>
                  <FormattedMessage
                    description="about security key - handle"
                    defaultMessage="Improving the security level of eduID"
                  />
                </Link>
              ),
            }}
          />
        </p>

        <div id="register-webauthn-tokens-area" className="table-responsive">
          {Boolean(tokens.length) && <UseSecurityKeyToggle />}
          <SecurityKeyTable />
          {!tokens.length && <br />}
          <span aria-label="select extra webauthn">
            <strong>
              <FormattedMessage description="select extra webauthn" defaultMessage="Add a new security key:" />
            </strong>
          </span>
          <div className="buttons">
            <div>
              <EduIDButton
                id="security-webauthn-platform-button"
                buttonstyle="primary"
                onClick={() => handleRegisterWebauthn("platform")}
                disabled={!isPlatformAuthenticatorAvailable || isRegisteringAuthenticator}
              >
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
                buttonstyle="primary"
                onClick={() => handleRegisterWebauthn("cross-platform")}
                disabled={isRegisteringAuthenticator}
              >
                <FormattedMessage description="add webauthn token key" defaultMessage="external security key" />
              </EduIDButton>
              <p className="help-text">
                <FormattedMessage description="platform authn key help text" defaultMessage="USB Security Key." />
              </p>
            </div>
          </div>
        </div>
      </div>
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
    </article>
  );
}

function SecurityKeyTable() {
  const credentialKey = useRef<string | null>(null);
  const authn = useAppSelector((state) => state.authn);
  let btnVerify;
  let date_success;
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => {
    return filterTokensFromCredentials(state);
  });
  const [showConfirmRemoveSecurityKeyModal, setShowConfirmRemoveSecurityKeyModal] = useState(false);

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
        if (parsedFrontendState.method === "freja") {
          await handleVerifyWebauthnTokenFreja(parsedFrontendState.credential);
        } else {
          await handleVerifyWebauthnTokenBankID(parsedFrontendState.credential);
        }
        dispatch(authnSlice.actions.setAuthnFrontendReset());
      }
    })();
  }, [authn?.response?.frontend_action]);

  // Verify Freja
  async function handleVerifyWebauthnTokenFreja(token: string) {
    const response = await dispatch(eidasVerifyCredential({ credential_id: token, method: "freja" }));
    if (eidasVerifyCredential.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    } else if (eidasVerifyCredential.rejected.match(response)) {
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "verifyCredential",
          frontend_state: JSON.stringify({ method: "freja", credential: token }),
        })
      );
    }
  }

  // Verify BankID
  async function handleVerifyWebauthnTokenBankID(token: string) {
    const response = await dispatch(bankIDVerifyCredential({ credential_id: token, method: "bankid" }));
    if (bankIDVerifyCredential.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    } else if (bankIDVerifyCredential.rejected.match(response)) {
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "verifyCredential",
          frontend_state: JSON.stringify({ method: "bankid", credential: token }),
        })
      );
    }
  }

  async function handleConfirmDeleteModal(credential_key: string) {
    credentialKey.current = credential_key;
    // Test if the user can directly execute the action or a re-auth security zone will be required
    // If no re-auth is required, then show the modal to confirm the removal
    // else show the re-auth modal and do now show the confirmation modal (show only 1 modal)
    const response = await dispatch(getAuthnStatus({ frontend_action: "removeSecurityKeyAuthn" }));
    if (getAuthnStatus.fulfilled.match(response) && response.payload.authn_status === ActionStatus.OK) {
      setShowConfirmRemoveSecurityKeyModal(true);
    } else {
      handleRemoveWebauthnToken();
    }
  }

  async function handleRemoveWebauthnToken() {
    setShowConfirmRemoveSecurityKeyModal(false);
    const response = await dispatch(removeWebauthnToken({ credential_key: credentialKey.current as string }));
    if (removeWebauthnToken.rejected.match(response)) {
      // prepare authenticate() and AuthenticateModal
      dispatch(
        authnSlice.actions.setFrontendActionAndState({
          frontend_action: "removeSecurityKeyAuthn",
          frontend_state: credentialKey.current as string,
        })
      );
    }
  }

  // data that goes onto the table
  const security_key_table_data = tokens.map((cred: CredentialType) => {
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
        <span>
          <FormattedMessage description="security verified" defaultMessage="Verified" />
        </span>
      );
    } else {
      btnVerify = (
        <React.Fragment>
          <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnTokenFreja(cred.key)}>
            <FormattedMessage description="security verify" defaultMessage="Freja+" />
          </EduIDButton>
          <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnTokenBankID(cred.key)}>
            <FormattedMessage description="security verify" defaultMessage="BankID" />
          </EduIDButton>
        </React.Fragment>
      );
    }

    return (
      <tr key={cred.key} className={`webauthn-token-holder ${cred.verified ? "verified" : ""}`} data-token={cred.key}>
        <td>{cred.description}</td>
        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.created_ts).toString()}>
          {date_created}
        </td>
        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.success_ts).toString()}>
          {date_success}
        </td>
        <td className="value-status">{btnVerify}</td>
        <td>
          <EduIDButton
            id="remove-webauthn"
            buttonstyle="close"
            size="sm"
            onClick={() => handleConfirmDeleteModal(cred.key)}
          ></EduIDButton>
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
        </td>
      </tr>
    );
  });

  // show no table if no security keys
  if (!tokens.length) {
    return null;
  }

  return (
    <React.Fragment>
      <h4>
        <FormattedMessage description="manage your tokens" defaultMessage="Manage your tokens" />
      </h4>
      <table className="active-keys">
        <tbody>
          <tr>
            <th>
              <FormattedMessage description="security description name" defaultMessage="Name" />
            </th>
            <th>
              <FormattedMessage description="security creation date" defaultMessage="Created on" />
            </th>
            <th>
              <FormattedMessage description="security last used" defaultMessage="Used on" />
            </th>
            <th>
              <FormattedMessage description="security key status" defaultMessage="Verify" />
            </th>
            <th>
              <FormattedMessage description="security key remove" defaultMessage="Remove" />
            </th>
          </tr>
          {security_key_table_data}
        </tbody>
      </table>
    </React.Fragment>
  );
}