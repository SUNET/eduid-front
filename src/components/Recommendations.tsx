import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faIdCard, faKey, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserIdentities } from "apis/eduidPersonalData";
import { PhonesResponse } from "apis/eduidPhone";
import { CredentialType, requestCredentials, RequestCredentialsResponse } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import AccordionItemTemplate from "./AccordionItemTemplate";

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
      icon={<FontAwesomeIcon icon={faKey as IconProp} />}
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
      <Link to="settings/advanced-settings/">
        <FormattedMessage defaultMessage="Go to Advanced settings" description="go to Advanced settings" />
      </Link>
    </AccordionItemTemplate>
  );
}

function RecommendationPhone(props: PhonesResponse): JSX.Element | null {
  let description, title;
  const verifiedNumber = props.phones?.some((num) => num.verified === true);

  // if user has phone number and it is verified, do not show accordion item
  if (verifiedNumber) {
    return null;
  }
  // if user has no phone number or not confirmed, show accordion item with description and title
  if (props.phones === undefined || props.phones.length === 0) {
    description = (
      <FormattedMessage
        description="accordion item Phone additional info"
        defaultMessage="Add your phone number to enable safe reset of password and verification of identity."
      />
    );
    title = <FormattedMessage description="accordion item Add phone number" defaultMessage="Add your phone number" />;
  } else {
    if (!verifiedNumber) {
      description = (
        <FormattedMessage
          description="accordion item Phone additional info"
          defaultMessage="Confirm your phone number to enable safe reset of password and verification of identity."
        />
      );
      title = (
        <FormattedMessage
          description="accordion item Confirm phone number"
          defaultMessage="Confirm your phone number"
        />
      );
    }
  }

  return (
    <AccordionItemTemplate
      icon={<FontAwesomeIcon icon={faMobileScreen as IconProp} />}
      title={title}
      additionalInfo={null}
      uuid="recommendation-phone"
    >
      <p> {description}</p>
      <HashLink to="/profile/settings/#phone">
        <FormattedMessage defaultMessage="Go to Settings" description="go to settings" />
      </HashLink>
    </AccordionItemTemplate>
  );
}

function RecommendationAddingName(props: { display_name?: string }): JSX.Element | null {
  if (props.display_name) {
    return null;
  }

  return (
    <AccordionItemTemplate
      icon={<FontAwesomeIcon icon={faUser as IconProp} />}
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
      <Link key="settings" to="settings/">
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
  // if user verified with eidas or svipe, show accordion item to verify with nin
  if (props.identities.svipe?.verified || props.identities.eidas?.verified) {
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
      icon={<FontAwesomeIcon icon={faIdCard as IconProp} />}
      title={title}
      additionalInfo={null}
      uuid="recommendation-verify-identity"
    >
      <p>{description}</p>
      <Link key="verify-identity" to="verify-identity/">
        <FormattedMessage defaultMessage="Go to Identity" description="go to identity" />
      </Link>
    </AccordionItemTemplate>
  );
}

/**
 * This component is responsible for rendering the recommendations accordion.
 */
export function Recommendations(): JSX.Element | null {
  const dispatch = useDashboardAppDispatch();
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const identities = useDashboardAppSelector((state) => state.identities);
  const display_name = useDashboardAppSelector((state) => state.personal_data.response?.display_name);
  const verifiedNumber = phones?.some((num) => num.verified === true);
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

  if (identities.nin?.verified && verifiedNumber && tokens.length && display_name) {
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
        <RecommendationAddingName display_name={display_name} />
        <RecommendationPhone phones={phones} />
        <RecommendationVerifyIdentity identities={identities} />
        <RecommendationAddingSecurityKey credentials={tokens} />
      </Accordion>
    </article>
  );
}
