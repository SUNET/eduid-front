import React, { useEffect, useState } from "react";
import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import Splash from "./Splash";
import { securityKeyPattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import { useIntl } from "react-intl";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen
import { FormattedMessage } from "react-intl";
import { useDashboardAppSelector, useDashboardAppDispatch } from "dashboard-hooks";
// import { postVerifyWebauthnToken } from "actions/Security";
import { beginRegisterWebauthn, registerWebauthn, removeWebauthnToken, requestCredentials } from "apis/eduidSecurity";
import { clearNotifications } from "reducers/Notifications";
import securitySlice from "reducers/Security";
import { createAuthentication } from "login/app_utils/helperFunctions/navigatorCredential";
import { eidasVerifyCredential } from "apis/eduidEidas";

function Security(props: any) {
  const dispatch = useDashboardAppDispatch();
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const confirming_change = useDashboardAppSelector((state) => state.security.confirming_change);
  // const confirming_deletion = useDashboardAppSelector((state) => state.security.confirming_deletion);
  const redirect_to = useDashboardAppSelector((state) => state.security.location);
  const deleted = useDashboardAppSelector((state) => state.security.deleted);
  // const webauthn_asking_description = useDashboardAppSelector((state) => state.security.webauthn_asking_description);
  const authenticator = useDashboardAppSelector((state) => state.security.webauthn_authenticator);
  const config = useDashboardAppSelector((state) => state.config);

  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
              // Spinner will be stop when isPlatformAuthLoaded is updated to true
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
      const response = await dispatch(createAuthentication(resp.payload));
      if (createAuthentication.fulfilled.match(response)) dispatch(registerWebauthn({ descriptionValue }));
    }
  }

  return (
    <article id="security-container">
      <Splash showChildren={isPlatformAuthLoaded}>
        <div id="register-security-key-container">
          <div className="intro">
            <h3>{translate("security.security-key_title")}</h3>
            <p>{translate("security.second-factor")}</p>
          </div>
          <div id="register-webauthn-tokens-area" className="table-responsive">
            <SecurityKeyTable credentials={credentials} SecurityKeyTable config={config} />
            <label>
              <FormattedMessage
                description="select extra webauthn"
                defaultMessage={`Choose extra identification method:`}
              />
            </label>
            <div className="buttons">
              <Splash showChildren={isPlatformAuthenticatorAvailable}>
                <div>
                  <EduIDButton
                    id="security-webauthn-platform-button"
                    buttonstyle="primary"
                    onClick={() => handleStartAskingWebauthnDescription("platform")}
                  >
                    <FormattedMessage description="add webauthn token device" defaultMessage={`this device`} />
                  </EduIDButton>
                  <p className="help-text">
                    <FormattedMessage
                      description="platform authn device help text"
                      defaultMessage={`Touch/ Face ID on this device.`}
                    />
                  </p>
                </div>
              </Splash>
              <div>
                <EduIDButton
                  id="security-webauthn-button"
                  buttonstyle="primary"
                  onClick={() => handleStartAskingWebauthnDescription("cross-platform")}
                >
                  <FormattedMessage description="add webauthn token key" defaultMessage={`security key`} />
                </EduIDButton>
                <p className="help-text">
                  <FormattedMessage description="platform authn key help text" defaultMessage={`USB Security Key.`} />
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
              defaultMessage={`Add a name for your security key`}
            />
          }
          placeholder={placeholder}
          showModal={showModal}
          closeModal={handleStopAskingWebauthnDescription}
          handleConfirm={handleStartWebauthnRegistration}
          modalFormLabel={
            <FormattedMessage description="security webauthn credential type" defaultMessage={`Security key`} />
          }
          validationPattern={securityKeyPattern}
          validationError={"security.description_invalid_format"}
          helpBlock={
            <FormattedMessage
              defaultMessage={`max 50 characters`}
              description="Help text for security key max length"
            />
          }
        />
      </Splash>
    </article>
  );
}

function SecurityKeyTable(props: any) {
  let btnVerify;
  let date_success;
  const dispatch = useDashboardAppDispatch();
  // get FIDO tokens from list of all user credentials
  const tokens = props.credentials.filter(
    (cred: any) =>
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

  function handleRemoveWebauthnToken(token: string) {
    // const dataset = (e.target as HTMLElement).closest(".webauthn-token-holder");
    // const token = dataset?.closest(".webauthn-token-holder");
    // dispatch(postRemoveWebauthnToken(token));
    dispatch(removeWebauthnToken({ token }));
  }

  // data that goes onto the table
  const security_key_table_data = tokens.map((cred: any, index: number) => {
    // date created
    const date_created = cred.created_ts.slice(0, "YYYY-MM-DD".length);
    // date last used
    if (cred.success_ts) {
      date_success = cred.success_ts.slice(0, "YYYY-MM-DD".length);
    } else {
      date_success = translate("security.last-used.date");
    }

    // verify button/ verified badge
    if (cred.verified) {
      btnVerify = (
        <label
          className="no button verified"
          // disabled
        >
          {translate("security.verified")}
        </label>
      );
    } else {
      btnVerify = (
        <EduIDButton buttonstyle="link" size="sm" onClick={() => handleVerifyWebauthnToken(cred.key)}>
          {translate("security.verify")}
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
          <th className="security-name">{translate("security.description")}</th>
          <th className="security-creation-date">{translate("security.creation_date")}</th>
          <th className="security-last-used-date">{translate("security.last_used")}</th>
          <th className="security-verify-link" />
          <th className="security-remove-data" />
        </tr>
        {security_key_table_data}
      </tbody>
    </table>
  );
}

export default Security;
