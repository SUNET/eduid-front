import React, { useEffect, useState } from "react";
import EduIDButton from "components/EduIDButton";
import { securityKeyPattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import { useIntl } from "react-intl";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen
import { FormattedMessage } from "react-intl";
import { useDashboardAppSelector, useDashboardAppDispatch } from "dashboard-hooks";
import {
  beginRegisterWebauthn,
  CredentialType,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
  RequestCredentialsResponse,
} from "apis/eduidSecurity";
import { clearNotifications } from "reducers/Notifications";
import securitySlice from "reducers/Security";
import { createCredential } from "login/app_utils/helperFunctions/navigatorCredential";
import { eidasVerifyCredential } from "apis/eduidEidas";

export function Security(): JSX.Element | null {
  const dispatch = useDashboardAppDispatch();
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  useEffect(() => {
    if (isLoaded) {
      // call requestCredentials once app is loaded
      dispatch(requestCredentials());
    }
  }, [isLoaded]);

  useEffect(
    () => {
      // Check if platform authentication is available through the navigator.credentials API.
      // Disable the spinner when we know the answer.

      let aborted = false; // flag to avoid updating unmounted components after this async promise resolves

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
    defaultMessage: "Describe your security key",
    description: "placeholder text for security key description input",
  });

  function handleStartAskingWebauthnDescription(authType: string) {
    dispatch(clearNotifications());
    dispatch(securitySlice.actions.chooseAuthenticator(authType));
    setShowModal(true);
  }

  function handleStopAskingWebauthnDescription() {
    setShowModal(false);
  }

  async function handleStartWebauthnRegistration() {
    const description = document.getElementById("describe-webauthn-token-modal") as HTMLInputElement;
    const descriptionValue = description?.value.trim();
    setShowModal(false);
    const resp = await dispatch(beginRegisterWebauthn());
    if (beginRegisterWebauthn.fulfilled.match(resp)) {
      const response = await dispatch(createCredential(resp.payload));
      if (createCredential.fulfilled.match(response)) {
        await dispatch(registerWebauthn({ descriptionValue }));
      }
    }
  }

  if (!isPlatformAuthLoaded) return null;

  return (
    <article id="security-container">
      <div id="register-security-key-container">
        <div className="intro">
          <h3>
            <FormattedMessage description="security key title" defaultMessage="Make your eduID more secure" />
          </h3>
          <p>
            <FormattedMessage
              description="security second factor"
              defaultMessage={`Add a security key as a second layer of identification, beyond email and password, 
                  to prove you are the owner of your eduID.`}
            />
          </p>
        </div>
        <div id="register-webauthn-tokens-area" className="table-responsive">
          <SecurityKeyTable credentials={credentials} />
          <label>
            <FormattedMessage
              description="select extra webauthn"
              defaultMessage="Choose extra identification method:"
            />
          </label>
          <div className="buttons">
            {isPlatformAuthenticatorAvailable ? (
              <div>
                <EduIDButton
                  id="security-webauthn-platform-button"
                  buttonstyle="primary"
                  onClick={() => handleStartAskingWebauthnDescription("platform")}
                >
                  <FormattedMessage description="add webauthn token device" defaultMessage="this device" />
                </EduIDButton>
                <p className="help-text">
                  <FormattedMessage
                    description="platform authn device help text"
                    defaultMessage="Touch/ Face ID on this device."
                  />
                </p>
              </div>
            ) : null}
            <div>
              <EduIDButton
                id="security-webauthn-button"
                buttonstyle="primary"
                onClick={() => handleStartAskingWebauthnDescription("cross-platform")}
              >
                <FormattedMessage description="add webauthn token key" defaultMessage="security key" />
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
        placeholder={placeholder}
        showModal={showModal}
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

function SecurityKeyTable(props: RequestCredentialsResponse) {
  let btnVerify;
  let date_success;
  const dispatch = useDashboardAppDispatch();
  // get FIDO tokens from list of all user credentials
  const tokens = props.credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );

  async function handleVerifyWebauthnToken(token: string) {
    const response = await dispatch(eidasVerifyCredential({ credential_id: token, method: "freja" }));
    if (eidasVerifyCredential.fulfilled.match(response)) {
      if (response.payload.location) {
        window.location.assign(response.payload.location);
      }
    }
  }

  function handleRemoveWebauthnToken(credential_key: string) {
    dispatch(removeWebauthnToken({ credential_key }));
  }

  // data that goes onto the table
  const security_key_table_data = tokens.map((cred: CredentialType, index: number) => {
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
        <label
          className="no button verified"
          // disabled
        >
          <FormattedMessage description="security verified" defaultMessage="Verified" />
        </label>
      );
    } else {
      btnVerify = (
        <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnToken(cred.key)}>
          <FormattedMessage description="security verify" defaultMessage="Verify key" />
        </EduIDButton>
      );
    }

    return (
      <tr key={index} className={`webauthn-token-holder ${cred.verified ? "verified" : ""}`} data-token={cred.key}>
        <td>{cred.description}</td>
        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.created_ts).toString()}>
          {date_created}
        </td>
        <td data-toggle="tooltip" data-placement="top" title={new Date(cred.success_ts).toString()}>
          {date_success}
        </td>
        <td>{btnVerify}</td>
        <td>
          <EduIDButton
            id="remove-webauthn"
            buttonstyle="close"
            size="sm"
            onClick={() => handleRemoveWebauthnToken(cred.key)}
          ></EduIDButton>
        </td>
      </tr>
    );
  });

  // show no table if no security keys
  if (!tokens.length) {
    return null;
  }

  return (
    <table className="table-form passwords">
      <tbody>
        <tr>
          <th className="security-name">
            <FormattedMessage description="security description name" defaultMessage="Name" />
          </th>
          <th className="security-creation-date">
            <FormattedMessage description="security creation date" defaultMessage="Created on" />
          </th>
          <th className="security-last-used-date">
            <FormattedMessage id="security last used" defaultMessage="Used on" />
          </th>
          <th className="security-verify-link" />
          <th className="security-remove-data" />
        </tr>
        {security_key_table_data}
      </tbody>
    </table>
  );
}
