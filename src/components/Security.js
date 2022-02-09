import React, { useEffect, useState } from "react";
import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import PropTypes from "prop-types";
import { Spinner } from "spin.js";
import { spinnerOpts } from "../components/Splash";
import { securityKeyPattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import NotificationModal from "../login/components/Modals/NotificationModal";
import { useIntl } from "react-intl";
import CookieChecker from "./../components/CookieChecker";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen

function Security(props) {
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const spinnerRef = React.createRef();
  let spinner;

  useEffect(() => {
    if (isPlatformAuthLoaded) {
      // Spinner will be running until isPlatformAuthLoaded is updated to true
      if (spinner !== undefined) {
        spinner.stop();
      }
    }
  }, [isPlatformAuthLoaded]);

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

  useEffect(() => {
    if (!isPlatformAuthLoaded && !spinner) {
      // The spinner needs to be set up _after_ the spinnerRef is attached to it's <div>
      if (spinnerRef.current) {
        spinner = new Spinner(spinnerOpts).spin(spinnerRef.current);
      }
    }
  });

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "security.placeholder",
    defaultMessage: "Describe your security key",
    description: "placeholder text for security key description input",
  });

  return (
    <div id="security-container">
      {!isPlatformAuthLoaded && <div ref={spinnerRef} id="eduid-splash-screen" />}
      <div id="register-securitykey-container">
        <div className="intro">
          <h4>{translate("security.security-key_title")}</h4>
          <p>{translate("security.second-factor")}</p>
        </div>
        <div id="register-webauthn-tokens-area" className="table-responsive">
          <SecurityKeyTable {...props} />
          <div className="register-authn-buttons">
            {isPlatformAuthenticatorAvailable ? (
              // TODO: will remove CookieChecker when user can authenticate with other devices
              <CookieChecker cookieName="show-platform-auth">
                <EduIDButton
                  id="security-webauthn-platform-button"
                  onClick={props.handleStartAskingDeviceWebauthnDescription}
                >
                  {translate("security.add_webauthn_token_device")}
                </EduIDButton>
              </CookieChecker>
            ) : null}
            <button
              id="security-webauthn-button"
              className={isPlatformAuthenticatorAvailable ? "second-option" : "btn btn-primary"}
              onClick={props.handleStartAskingKeyWebauthnDescription}
            >
              {translate("security.add_webauthn_token_key")}
            </button>
          </div>
        </div>
      </div>

      <NotificationModal
        modalId="securityConfirmDialog"
        title={translate("security.confirm_title_chpass")}
        mainText={translate("security.change_info")}
        showModal={props.confirming_change}
      />

      <ConfirmModal
        modalId="describeWebauthnTokenDialog"
        id="describeWebauthnTokenDialogControl"
        title={translate("security.webauthn-describe-title")}
        resendLabel={translate("security.webauthn_credential_type")}
        placeholder={placeholder}
        with_resend_link={false}
        showModal={Boolean(props.webauthn_asking_description)}
        closeModal={props.handleStopAskingWebauthnDescription}
        handleConfirm={props.handleStartWebauthnRegistration}
        helpBlock={translate("security.help_text")}
        validationPattern={securityKeyPattern}
        validationError={"security.description_invalid_format"}
      />
    </div>
  );
}

function SecurityKeyTable(props) {
  let btnVerify = "";
  let date_success = "";

  // filter out password from data
  const tokens = props.credentials.filter((cred) => cred.credential_type !== "security.password_credential_type");

  // data that goes onto the table
  const securitykey_table_data = tokens.map((cred, index) => {
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
        <label className="nobutton verified" disabled>
          {translate("security.verified")}
        </label>
      );
    } else {
      btnVerify = (
        <EduIDButton className="btn-link nobutton verify-status-label" onClick={props.handleVerifyWebauthnToken}>
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
          <EduIDButton className="btn-link btn-remove-webauthn" onClick={props.handleRemoveWebauthnToken}>
            <svg
              className="remove"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 0h2v16H7z" />
              <path d="M0 9V7h16v2z" />
            </svg>
          </EduIDButton>
        </td>
      </tr>
    );
  }, this);

  // show no table if no security keys
  if (!tokens.length > 0) {
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
        {securitykey_table_data}
      </tbody>
    </table>
  );
}

Security.propTypes = {
  credentials: PropTypes.array,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  langs: PropTypes.array,
  handleStartWebauthnRegistration: PropTypes.func,
  handleCloseWebauthnModal: PropTypes.func,
};

export default Security;
