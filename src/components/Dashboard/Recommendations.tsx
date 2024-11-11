import { UserIdentities } from "apis/eduidPersonalData";
import { CredentialType, requestCredentials } from "apis/eduidSecurity";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function ConfirmedAccountStatus(props: { given_name?: string }): JSX.Element | null {
  return (
    <div className={`status-box ${props.given_name ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input type="checkbox" checked={Boolean(props.given_name)} aria-label="confirmed account" />
      </div>
      <h4>
        <FormattedMessage description="Confirmed account heading" defaultMessage="Confirmed Account" />
      </h4>
      <p>
        <FormattedMessage
          description="confirmed account description"
          defaultMessage="add your name at {account}"
          values={{
            account: (
              <Link key={ACCOUNT_PATH} to={ACCOUNT_PATH} aria-label="go to account page">
                Account
              </Link>
            ),
          }}
        />
      </p>
    </div>
  );
}

function VerifiedIdentityStatus(props: { identities?: UserIdentities }): JSX.Element | null {
  return (
    <div className={`status-box ${props.identities?.is_verified ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input type="checkbox" checked={props.identities?.is_verified} aria-label="Verified Identity" />
      </div>
      <h4>
        <FormattedMessage description="connect your identity to eduID heading" defaultMessage="Verified Identity" />
      </h4>
      <p>
        <FormattedMessage
          description="connect your identity to eduID description"
          defaultMessage="connect your identity to eduID at {identity}"
          values={{
            identity: (
              <Link key={IDENTITY_PATH} to={IDENTITY_PATH} aria-label="go to identity page">
                Identity
              </Link>
            ),
          }}
        />
      </p>
    </div>
  );
}

function ImprovedSecurityStatus(props: { tokens?: CredentialType[] }): JSX.Element | null {
  return (
    <div className={`status-box ${props.tokens?.length ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input type="checkbox" checked={Boolean(props.tokens?.length)} aria-label="Verified Identity" />
      </div>
      <h4>
        <FormattedMessage description="add two-factor authentication heading" defaultMessage="Improved security" />
      </h4>
      <p>
        <FormattedMessage
          description="add two-factor authentication description"
          defaultMessage="add two-factor authentication at {security}"
          values={{
            security: (
              <Link key={SECURITY_PATH} to={SECURITY_PATH} aria-label="go to security page">
                Security
              </Link>
            ),
          }}
        />
      </p>
    </div>
  );
}

function VerifiedSecurityStatus(props: { tokens?: CredentialType[] }): JSX.Element | null {
  const verifiedToken = props.tokens?.find((token) => token.verified);
  return (
    <div className={`status-box ${verifiedToken ? "success" : ""}`}>
      <div className="custom-checkbox-wrapper">
        <input type="checkbox" checked={Boolean(verifiedToken)} aria-label="Verified security" />
      </div>
      <h4>
        <FormattedMessage description="verified security key heading" defaultMessage="Verified security" />
      </h4>
      <p>
        <FormattedMessage
          description="verified security key description"
          defaultMessage="verified security key at {security}"
          values={{
            security: (
              <Link key={SECURITY_PATH} to={SECURITY_PATH} aria-label="go to security page">
                Security
              </Link>
            ),
          }}
        />
      </p>
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
          defaultMessage="Status of completed steps are indicted with a checkmark."
        />
      </p>
      <ConfirmedAccountStatus given_name={given_name} />
      <VerifiedIdentityStatus identities={identities} />
      <ImprovedSecurityStatus tokens={tokens} />
      <VerifiedSecurityStatus tokens={tokens} />
    </article>
  );
}
