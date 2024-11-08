import { CredentialType, requestCredentials } from "apis/eduidSecurity";
import { ACCOUNT_PATH, IDENTITY_PATH, SECURITY_PATH } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

function RecommendationAddingSecurityKey(): JSX.Element | null {
  return (
    <>
      <p>
        <FormattedMessage
          description="accordion item security key additional info"
          defaultMessage="Add your security key to enable safe reset of password"
        />
      </p>
      <Link key="advanced-settings" to={SECURITY_PATH}>
        <FormattedMessage defaultMessage="Go to Advanced settings" description="go to Advanced settings" />
      </Link>
    </>
  );
}

function RecommendationAddingName(): JSX.Element | null {
  return (
    <>
      <p>
        <FormattedMessage
          description="accordion item name additionalInfo"
          defaultMessage="Name can be used to personalise services that you access with your eduID."
        />
      </p>
      <Link key="settings" to={ACCOUNT_PATH}>
        <FormattedMessage defaultMessage="Go to Settings" description="go to settings" />
      </Link>
    </>
  );
}

function RecommendationVerifyIdentity(): JSX.Element | null {
  return (
    <>
      <p>
        <FormattedMessage
          description="accordion item name additionalInfo"
          defaultMessage="Name can be used to personalise services that you access with your eduID."
        />
      </p>
      <Link key="verify-identity" to={IDENTITY_PATH}>
        <FormattedMessage defaultMessage="Go to Identity" description="go to identity" />
      </Link>
    </>
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
        <FormattedMessage description="recommendation title" defaultMessage="Recommended actions for you" />
      </h2>
      <p>
        <FormattedMessage
          description="recommendation title"
          defaultMessage="To get the most out of eduID we recommend that you follow the below recommendations."
        />
      </p>
      <RecommendationAddingName />
      <RecommendationVerifyIdentity />
      <RecommendationAddingSecurityKey />
    </article>
  );
}
