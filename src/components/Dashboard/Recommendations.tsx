import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIdentities } from "apis/eduidPersonalData";
import { CredentialType, requestCredentials } from "apis/eduidSecurity";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function ConfirmedAccountStatus(props: { readonly email?: string }): JSX.Element | null {
  return (
    <div className={`status-box ${props.email ? "success" : ""}`}>
      <div className="checkbox-wrapper">{props.email ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}</div>
      <div className="text-wrapper">
        <h3>
          <FormattedMessage description="Confirmed account heading" defaultMessage="Confirmed account" />
        </h3>
        <span>
          <FormattedMessage
            description="confirmed account description"
            defaultMessage="Read more details about your confirmed account at {account}"
            values={{
              account: (
                <Link key={ACCOUNT_PATH} to={ACCOUNT_PATH} aria-label="go to account page">
                  <FormattedMessage description="recommendations account link" defaultMessage="Account" />
                </Link>
              ),
            }}
          />
        </span>
      </div>
    </div>
  );
}

function VerifiedIdentityStatus(props: { readonly identities?: UserIdentities }): JSX.Element | null {
  const identityLink = (
    <Link key={IDENTITY_PATH} to={IDENTITY_PATH} aria-label="go to identity page">
      <FormattedMessage description="recommendations identity link" defaultMessage="Identity" />
    </Link>
  );
  return (
    <div className={`status-box ${props.identities?.is_verified ? "success" : ""}`}>
      <div className="checkbox-wrapper">
        {props.identities?.is_verified === true ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}
      </div>
      <div className="text-wrapper">
        <h3>
          {props.identities?.is_verified === true ? (
            <FormattedMessage description="Verified Identity heading" defaultMessage="Verified identity" />
          ) : (
            <FormattedMessage description="Verify Identity heading" defaultMessage="Verify your identity" />
          )}
        </h3>
        <span>
          {props.identities?.is_verified === true ? (
            <FormattedMessage
              description="read more details about your verified identity description"
              defaultMessage="Read more details about your verified identity at {identity}"
              values={{
                identity: identityLink,
              }}
            />
          ) : (
            <FormattedMessage
              description="connect your identity to eduID description"
              defaultMessage="Connect your identity to eduID at {identity}"
              values={{
                identity: identityLink,
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

function ImprovedSecurityStatus(props: { readonly tokens?: CredentialType[] }): JSX.Element | null {
  const securityLink = (
    <Link key={SECURITY_PATH} to={SECURITY_PATH} aria-label="go to security page">
      <FormattedMessage description="recommendations security link" defaultMessage="Security" />
    </Link>
  );
  return (
    <div className={`status-box ${props.tokens?.length ? "success" : ""}`}>
      <div className="checkbox-wrapper">
        {props.tokens?.length ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}
      </div>
      <div className="text-wrapper">
        <h3>
          {props.tokens?.length ? (
            <FormattedMessage description="Improved Security heading" defaultMessage="Enhanced security" />
          ) : (
            <FormattedMessage description="Improve Security heading" defaultMessage="Enhance security" />
          )}
        </h3>
        <span>
          {props.tokens?.length ? (
            <FormattedMessage
              description="read more about your two-factor authentication description"
              defaultMessage="Read more about your two-factor authentication at {security}"
              values={{
                security: securityLink,
              }}
            />
          ) : (
            <FormattedMessage
              description="add two-factor authentication description"
              defaultMessage="Add two-factor authentication at {security}"
              values={{
                security: securityLink,
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

function VerifiedSecurityStatus(props: { readonly tokens?: CredentialType[] }): JSX.Element | null {
  const manageSecurityKeyLink = (
    <HashLink
      key={`${SECURITY_PATH}#manage-security-keys`}
      to={`${SECURITY_PATH}#manage-security-keys`}
      aria-label="go to manage your security key section"
    >
      <FormattedMessage description="recommendations security link" defaultMessage="Security" />
    </HashLink>
  );
  const verifiedToken = props.tokens?.find((token) => token.verified);
  return (
    <div className={`status-box ${verifiedToken ? "success" : ""}`}>
      <div className="checkbox-wrapper">{verifiedToken ? <FontAwesomeIcon icon={faCircleCheck} /> : <div />}</div>
      <div className="text-wrapper">
        <h3>
          {verifiedToken ? (
            <FormattedMessage description="Verified Security key heading" defaultMessage="Verified security key" />
          ) : (
            <FormattedMessage description="Verify your Security key" defaultMessage="Verify your security key" />
          )}
        </h3>
        <span>
          {verifiedToken ? (
            <FormattedMessage
              description="verified security key description"
              defaultMessage="Read more details about your verified two-factor authentication at {security}"
              values={{
                security: manageSecurityKeyLink,
              }}
            />
          ) : (
            <FormattedMessage
              description="verify your security key description"
              defaultMessage="Verify your security key at {security}"
              values={{
                security: manageSecurityKeyLink,
              }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export function Recommendations(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const credentials = useAppSelector((state) => state.security.credentials);
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const emails = useAppSelector((state) => state.emails.emails);
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

  if (!emails.length) {
    return null;
  }

  const email = emails?.filter((mail) => mail.primary)[0].email;

  if (!isLoaded) {
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
          defaultMessage="The strength and usage of your eduID can be improved by following the steps listed below."
        />
      </p>
      <p>
        <FormattedMessage
          description="status overview paragraph2"
          defaultMessage={`Suggestions on what might be required depending on the 
              organisation you are accessing with your eduID, can be found in the Assurance levels section in {help}.`}
          values={{
            help: (
              <Link key="/help" to="/help" aria-label="go to help page" target="_blank">
                <FormattedMessage description="recommendations help link" defaultMessage="Help" />
              </Link>
            ),
          }}
        />
      </p>
      <p className="help-text">
        <FormattedMessage
          description="status overview paragraph3"
          defaultMessage="Status of completed steps are indicated with a checkmark."
        />
      </p>
      <section className="status-boxes">
        <ConfirmedAccountStatus email={email} />
        <VerifiedIdentityStatus identities={identities} />
        <ImprovedSecurityStatus tokens={tokens} />
        <VerifiedSecurityStatus tokens={tokens} />
      </section>
      <p className="help-text">
        <FormattedMessage
          description="confirmed account description"
          defaultMessage="Note: additional settings such as language, email addresses, password management as well as ORCID and ESI affiliation 
      can be edited at  {account}."
          values={{
            account: (
              <Link key={ACCOUNT_PATH} to={ACCOUNT_PATH} aria-label="go to account page">
                <FormattedMessage description="recommendations account link" defaultMessage="Account" />
              </Link>
            ),
          }}
        />
      </p>
    </article>
  );
}
