import { bankIDVerifyCredential } from "apis/eduidBankid";
import { eidasVerifyCredential } from "apis/eduidEidas";
import {
  beginRegisterWebauthn,
  CredentialType,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
  RequestCredentialsResponse,
} from "apis/eduidSecurity";
import EduIDButton from "components/Common/EduIDButton";
<<<<<<< HEAD
import { useAppDispatch, useAppSelector } from "eduid-hooks";
=======
>>>>>>> a84b08339 (correct path)
import { createCredential } from "helperFunctions/navigatorCredential";
import { securityKeyPattern } from "helperFunctions/validation/regexPatterns";
import {
  useIndexAppDispatch as useDashboardAppDispatch,
  useIndexAppSelector as useDashboardAppSelector,
} from "index-hooks";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { clearNotifications } from "slices/Notifications";
import securitySlice from "slices/Security";
import ConfirmModal from "./ConfirmModal";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

export function Security(): React.ReactElement | null {
  const dispatch = useAppDispatch();
  const credentials = useAppSelector((state) => state.security.credentials);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);

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

  function handleStartWebauthnRegistration(values: { [key: string]: string }) {
    (async () => {
      try {
        const description = values["describe-webauthn-token-modal"];
        const descriptionValue = description?.trim();
        setShowModal(false);
        const resp = await dispatch(beginRegisterWebauthn());
        if (beginRegisterWebauthn.fulfilled.match(resp)) {
          const response = await dispatch(createCredential(resp.payload));
          if (createCredential.fulfilled.match(response)) {
            await dispatch(registerWebauthn({ descriptionValue }));
          }
        }
      } catch (err) {}
    })();
  }

  if (!isPlatformAuthLoaded) return null;
  return (
    <article id="security-container">
      <div id="register-security-key-container">
        <h2>
          <FormattedMessage description="security key title" defaultMessage="Make your eduID more secure" />
        </h2>
        <p>
          <FormattedMessage
            description="security second factor"
            defaultMessage={`Add a security key as a second layer of identification, beyond username and password,
                  to prove you are the owner of your eduID.`}
          />
        </p>
        <p className="help-text">
          <FormattedMessage
            description="security second factor help info"
            defaultMessage={`You can read more about security keys in the Help section: {FAQSecurityKeys}.`}
            values={{
              FAQSecurityKeys: (
                <Link className="text-link" to={`../../../faq`}>
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
          <SecurityKeyTable credentials={credentials} />
          <span aria-label="select extra webauthn">
            <strong>
              <FormattedMessage
                description="select extra webauthn"
                defaultMessage="Choose extra identification method:"
              />
            </strong>
          </span>
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
  const dispatch = useAppDispatch();
  // get FIDO tokens from list of all user credentials
  const tokens = props.credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );

  function handleVerifyWebauthnTokenFreja(token: string) {
    (async () => {
      const response = await dispatch(eidasVerifyCredential({ credential_id: token, method: "freja" }));
      if (eidasVerifyCredential.fulfilled.match(response)) {
        if (response.payload.location) {
          window.location.assign(response.payload.location);
        }
      }
    })();
  }

  function handleVerifyWebauthnTokenBankID(token: string) {
    (async () => {
      const response: any = await dispatch(bankIDVerifyCredential({ credential_id: token, method: "bankid" }));
      if (bankIDVerifyCredential.fulfilled.match(response)) {
        if (response.payload.location) {
          window.location.assign(response.payload.location);
        }
      } else if (response?.payload.payload.message === "bankid.must_authenticate") {
        dispatch(clearNotifications());
        const nextURL = config.dashboard_url + "settings/advanced-settings";
        const url = config.authn_url + "reauthn?next=" + encodeURIComponent(nextURL);
        window.location.assign(url);
      }
    })();
  }

  function handleRemoveWebauthnToken(credential_key: string) {
    (async () => {
      await dispatch(removeWebauthnToken({ credential_key }));
    })();
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
        <>
          <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnTokenFreja(cred.key)}>
            <FormattedMessage description="security verify" defaultMessage="Freja+" />
          </EduIDButton>
          <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnTokenBankID(cred.key)}>
            <FormattedMessage description="security verify" defaultMessage="BankID" />
          </EduIDButton>
        </>
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
        {tokens.length > 1 ? (
          <td>
            <EduIDButton
              id="remove-webauthn"
              buttonstyle="close"
              size="sm"
              onClick={() => handleRemoveWebauthnToken(cred.key)}
            ></EduIDButton>
          </td>
        ) : null}
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
            <FormattedMessage description="security last used" defaultMessage="Used on" />
          </th>
          <th>
            <FormattedMessage description="security key status" defaultMessage="Verify" />
          </th>
          <th className="display-none">
            <FormattedMessage description="security key remove" defaultMessage="Remove" />
          </th>
        </tr>
        {security_key_table_data}
      </tbody>
    </table>
  );
}
