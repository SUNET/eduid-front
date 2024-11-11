import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIdentities } from "apis/eduidPersonalData";
import { CredentialType, requestCredentials } from "apis/eduidSecurity";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function ConfirmedAccountStatus(props: { given_name?: string }): JSX.Element | null {
  return (
    <div className={`status-box ${props.given_name ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        {props.given_name ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}

        {/* <input type="checkbox" checked={Boolean(props.given_name)} aria-label="confirmed account" onChange={() => {}} /> */}
      </div>
      <div className="text-wrapper">
        <h3>
          <FormattedMessage description="Confirmed account heading" defaultMessage="Confirmed Account" />
        </h3>
        <p>
          <FormattedMessage
            description="confirmed account description"
            defaultMessage="Add your name at {account}"
            values={{
              account: (
                <Link key={settingsPath} to={settingsPath} aria-label="go to account page">
                  Account
                </Link>
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
}

function VerifiedIdentityStatus(props: { identities?: UserIdentities }): JSX.Element | null {
  return (
    <div className={`status-box ${props.identities?.is_verified ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        {props.identities?.is_verified === true ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}
        {/* <input
          type="checkbox"
          checked={props.identities?.is_verified === true}
          aria-label="Verified Identity"
          onChange={() => {}}
        /> */}
      </div>
      <div className="text-wrapper">
        <h3>
          <FormattedMessage description="connect your identity to eduID heading" defaultMessage="Verified Identity" />
        </h3>
        <p>
          <FormattedMessage
            description="connect your identity to eduID description"
            defaultMessage="Connect your identity to eduID at {identity}"
            values={{
              identity: (
                <Link key={identityPath} to={identityPath} aria-label="go to identity page">
                  Identity
                </Link>
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
}

function ImprovedSecurityStatus(props: { tokens?: CredentialType[] }): JSX.Element | null {
  return (
    <div className={`status-box ${props.tokens?.length ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input
          type="checkbox"
          checked={Boolean(props.tokens?.length)}
          aria-label="Verified Identity"
          onChange={() => {}}
        />
      </div>
      <div className="text-wrapper">
        <h3>
          <FormattedMessage description="add two-factor authentication heading" defaultMessage="Improved security" />
        </h3>
        <p>
          <FormattedMessage
            description="add two-factor authentication description"
            defaultMessage="Add two-factor authentication at {security}"
            values={{
              security: (
                <Link key={advancedSettingsPath} to={advancedSettingsPath} aria-label="go to security page">
                  Security
                </Link>
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
}

function VerifiedSecurityStatus(props: { tokens?: CredentialType[] }): JSX.Element | null {
  const verifiedToken = props.tokens?.find((token) => token.verified);
  return (
    <div className={`status-box ${verifiedToken ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input type="checkbox" checked={Boolean(verifiedToken)} aria-label="Verified security" onChange={() => {}} />
      </div>
      <div className="text-wrapper">
        <h3>
          <FormattedMessage description="verified security key heading" defaultMessage="Verified security" />
        </h3>
        <p>
          <FormattedMessage
            description="verified security key description"
            defaultMessage="Verified security key at {security}"
            values={{
              security: (
                <Link key={advancedSettingsPath} to={advancedSettingsPath} aria-label="go to security page">
                  Security
                </Link>
              ),
            }}
          />
        </p>
      </div>
    </div>
  );
}

/**
 * This component is responsible for rendering the recommendations accordion.
 */
export function Recommendations(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const credentials = useAppSelector((state) => state.security.credentials);
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const tokens = credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );

  useEffect(() => {
    if (isLoaded) {
      // call requestCredentials once app is loaded
      dispatch(requestCredentials());
    }
  }, [isLoaded]);

  if (identities?.nin?.verified && tokens.length && given_name) {
    return null;
  }

  return (
    <article>
      <h2>
        <FormattedMessage description="status overview title" defaultMessage="eduID status overview" />
      </h2>
      <p>
        <FormattedMessage
          description="status overview paragraph1"
          defaultMessage="These are steps you can take to improve the strength and usage of your eduID listed below."
        />
      </p>
      <p>
        <FormattedMessage
          description="status overview paragraph2"
          defaultMessage="Suggestions as to what might be required depending on the assurance level from the organisation you are accessing with your eduID, can be found at {help}"
          values={{
            help: (
              <Link key="/help" to="/help" aria-label="go to help page">
                Help
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage
          description="status overview paragraph3"
          defaultMessage="Status of completed steps are indicated with a checkmark."
        />
      </p>
      <ConfirmedAccountStatus given_name={given_name} />
      <VerifiedIdentityStatus identities={identities} />
      <ImprovedSecurityStatus tokens={tokens} />
      <VerifiedSecurityStatus tokens={tokens} />
    </article>
  );
}
