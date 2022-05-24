import React, { useEffect, useState } from "react";
import EduIDButton from "components/EduIDButton";
import { translate } from "login/translation";
import PropTypes from "prop-types";
import { Spinner } from "spin.js";
import { spinnerOpts } from "./Splash";
import { securityKeyPattern } from "../login/app_utils/validation/regexPatterns";
import ConfirmModal from "../login/components/Modals/ConfirmModal";
import { useIntl } from "react-intl";
import "/node_modules/spin.js/spin.css"; // without this import, the spinner is frozen
import { FormattedMessage } from "react-intl";
import { useDashboardAppSelector, useDashboardAppDispatch } from "dashboard-hooks";
import {
  postRemoveWebauthnToken,
  postVerifyWebauthnToken,
  startWebauthnRegistration,
  startAskWebauthnDescription,
  stopAskWebauthnDescription,
  chooseAuthenticator,
} from "actions/Security";
import { clearNotifications } from "reducers/Notifications";
import DataTable from "login/components/DataTable/DataTable";

function Security(props: any) {
  const dispatch = useDashboardAppDispatch();
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const confirming_change = useDashboardAppSelector((state) => state.security.confirming_change);
  const confirming_deletion = useDashboardAppSelector((state) => state.security.confirming_deletion);
  const redirect_to = useDashboardAppSelector((state) => state.security.location);
  const deleted = useDashboardAppSelector((state) => state.security.deleted);
  const webauthn_asking_description = useDashboardAppSelector((state) => state.security.webauthn_asking_description);
  const authenticator = useDashboardAppSelector((state) => state.security.webauthn_authenticator);
  const [isPlatformAuthenticatorAvailable, setIsPlatformAuthenticatorAvailable] = useState(false);
  const [isPlatformAuthLoaded, setIsPlatformAuthLoaded] = useState(false);
  const spinnerRef = React.createRef();
  // let spinner;

  // useEffect(() => {
  //   if (isPlatformAuthLoaded) {
  //     // Spinner will be running until isPlatformAuthLoaded is updated to true
  //     if (spinner !== undefined) {
  //       spinner.stop();
  //     }
  //   }
  // }, [isPlatformAuthLoaded]);

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

  // useEffect(() => {
  //   if (!isPlatformAuthLoaded && !spinner) {
  //     // The spinner needs to be set up _after_ the spinnerRef is attached to it's <div>
  //     if (spinnerRef.current) {
  //       spinner = new Spinner(spinnerOpts).spin(spinnerRef.current);
  //     }
  //   }
  // });

  const intl = useIntl();
  // placeholder can't be an Element, we need to get the actual translated string here
  const placeholder = intl.formatMessage({
    id: "security.placeholder",
    defaultMessage: "Describe your security key",
    description: "placeholder text for security key description input",
  });

  function handleStartAskingDeviceWebauthnDescription() {
    dispatch(clearNotifications());
    dispatch(chooseAuthenticator("platform"));
    dispatch(startAskWebauthnDescription());
  }

  function handleStartAskingKeyWebauthnDescription() {
    dispatch(clearNotifications());
    dispatch(chooseAuthenticator("cross-platform"));
    dispatch(startAskWebauthnDescription());
  }

  function handleStopAskingWebauthnDescription() {
    dispatch(stopAskWebauthnDescription());
  }

  function handleStartWebauthnRegistration() {
    const description = document.getElementById("describe-webauthn-token-modal") as HTMLInputElement;
    const descriptionValue = description?.value.trim();
    dispatch(stopAskWebauthnDescription());
    dispatch(startWebauthnRegistration(descriptionValue));
  }

  return (
    <article id="security-container">
      {/* {!isPlatformAuthLoaded && 
      <div ref={spinnerRef} id="eduid-splash-screen" />} */}
      <div id="register-securitykey-container">
        <div className="intro">
          <h3>{translate("security.security-key_title")}</h3>
          <p>{translate("security.second-factor")}</p>
        </div>
        <div id="register-webauthn-tokens-area" className="table-responsive">
          <SecurityKeyTable credentials={credentials} />
          <label>
            <FormattedMessage
              description="select extra webauthn"
              defaultMessage={`Choose extra identification method:`}
            />
          </label>
          <div className="buttons">
            {isPlatformAuthenticatorAvailable ? (
              <EduIDButton
                id="security-webauthn-platform-button"
                buttonstyle="primary"
                onClick={handleStartAskingDeviceWebauthnDescription}
              >
                <FormattedMessage description="add webauthn token device" defaultMessage={`this device`} />
              </EduIDButton>
            ) : null}
            <EduIDButton
              id="security-webauthn-button"
              buttonstyle="primary"
              onClick={handleStartAskingKeyWebauthnDescription}
            >
              <FormattedMessage description="add webauthn token key" defaultMessage={`security key`} />
            </EduIDButton>
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
        showModal={Boolean(webauthn_asking_description)}
        closeModal={handleStopAskingWebauthnDescription}
        handleConfirm={handleStartWebauthnRegistration}
        modalFormLabel={
          <FormattedMessage description="security webauthn credential type" defaultMessage={`Security key`} />
        }
        validationPattern={securityKeyPattern}
        validationError={"security.description_invalid_format"}
        helpBlock={
          <FormattedMessage defaultMessage={`max 50 characters`} description="Help text for security key max length" />
        }
      />
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

  function handleVerifyWebauthnToken(e: React.MouseEvent<HTMLElement>) {
    // const dataset = (e.target as HTMLTextAreaElement).closest(".webauthn-token-holder");
    // const token = dataset?.token;
    // dispatch(postVerifyWebauthnToken(token));
  }

  function handleRemoveWebauthnToken(e: React.MouseEvent<HTMLElement>) {
    // const dataset = (e.target as HTMLElement).closest(".webauthn-token-holder");
    // const token = dataset?.token;
    // dispatch(postRemoveWebauthnToken(token));
  }

  // data that goes onto the table
  const securitykey_table_data = tokens.map((cred: any, index: number) => {
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
          className="nobutton verified"
          // disabled
        >
          {translate("security.verified")}
        </label>
      );
    } else {
      btnVerify = (
        <EduIDButton buttonstyle="link" size="sm" onClick={handleVerifyWebauthnToken}>
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
            onClick={handleRemoveWebauthnToken}
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
        {securitykey_table_data}
      </tbody>
    </table>
  );
}

export default Security;
