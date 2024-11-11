import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faIdCard, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIdentities } from "apis/eduidPersonalData";
import { CredentialType, RequestCredentialsResponse, requestCredentials } from "apis/eduidSecurity";
import { accountPath, identityPath, securityPath } from "components/IndexMain";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import AccordionItemTemplate from "../Common/AccordionItemTemplate";

/**
 * Recommendation for adding name, security key and phone number and verification of identity
 */
function RecommendationAddingSecurityKey(props: RequestCredentialsResponse): JSX.Element | null {
  if (props.credentials.length) {
    return null;
  }

  return (
    <AccordionItemTemplate
      uuid="recommendation-security-key"
      icon={<FontAwesomeIcon icon={faKey as IconProp} className="circle-icon" />}
      title={
        <FormattedMessage description="accordion item Adding security key" defaultMessage="Add your security key" />
      }
      additionalInfo={null}
    >
      <p>
        <FormattedMessage
          description="accordion item security key additional info"
          defaultMessage="Add your security key to enable safe reset of password"
        />
      </p>
      <Link key="advanced-settings" to={securityPath}>
        <FormattedMessage defaultMessage="Go to Advanced settings" description="go to Advanced settings" />
      </Link>
    </AccordionItemTemplate>
  );
}

function RecommendationAddingName(props: { given_name?: string }): JSX.Element | null {
  if (props.given_name) {
    return null;
  }

  return (
    <AccordionItemTemplate
      icon={<FontAwesomeIcon icon={faUser as IconProp} className="circle-icon" />}
      title={<FormattedMessage description="accordion item Adding name" defaultMessage="Add your name" />}
      additionalInfo={null}
      uuid="recommendation-add-name"
    >
      <p>
        <FormattedMessage
          description="accordion item name additionalInfo"
          defaultMessage="Name can be used to personalise services that you access with your eduID."
        />
      </p>
      <Link key="settings" to={accountPath}>
        <FormattedMessage defaultMessage="Go to Settings" description="go to settings" />
      </Link>
    </AccordionItemTemplate>
  );
}

function RecommendationVerifyIdentity(props: { identities: UserIdentities }): JSX.Element | null {
  let title, description;
  // if user has swedish nin and it is verified, do not show accordion item
  if (props.identities.nin?.verified) {
    return null;
  }
  // if user verified with eidas or passport, show accordion item to verify with nin
  if (props.identities.freja?.verified || props.identities.eidas?.verified) {
    title = (
      <FormattedMessage
        description="accordion item Verification with Swedish national ID number"
        defaultMessage="Verify your identity with Swedish national ID number"
      />
    );
    description = (
      <FormattedMessage
        description="accordion item additional info Verification with Swedish national ID number"
        defaultMessage={`If you have obtained a Swedish national ID number you are able to verify your identity 
            with the Swedish national ID number.`}
      />
    );
  } else {
    title = <FormattedMessage description="accordion item Verification" defaultMessage="Verify your identity" />;
    description = (
      <FormattedMessage
        description="accordion item additional info Verification additional info"
        defaultMessage="Your identity is not verified. Please verify your identity to get access to more services."
      />
    );
  }

  return (
    <AccordionItemTemplate
      icon={<FontAwesomeIcon icon={faIdCard as IconProp} className="circle-icon" />}
      title={title}
      additionalInfo={null}
      uuid="recommendation-verify-identity"
    >
      <p>{description}</p>
      <Link key="verify-identity" to={identityPath}>
        <FormattedMessage defaultMessage="Go to Identity" description="go to identity" />
      </Link>
    </AccordionItemTemplate>
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
      <Accordion allowMultipleExpanded allowZeroExpanded>
        <RecommendationAddingName given_name={given_name} />
        {identities && <RecommendationVerifyIdentity identities={identities} />}
        <RecommendationAddingSecurityKey credentials={tokens} />
      </Accordion>
    </article>
  );
}
