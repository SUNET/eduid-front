import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faHome, faIdCard, faKey, faMobileScreen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import { UserIdentities } from "apis/eduidPersonalData";
import { PhonesResponse } from "apis/eduidPhone";
import { CredentialType, requestCredentials, RequestCredentialsResponse } from "apis/eduidSecurity";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { LetterProofingState } from "reducers/LetterProofing";
import AccordionItemTemplate from "./AccordionItemTemplate";

/**
 * Currently process of letter proofing and/or verification of identity
 */
function LetterProofingProgress(props: { letter_proofing: LetterProofingState }): JSX.Element | null {
  let letterStatus;

  if (!props.letter_proofing.letter_sent) {
    return null;
  }

  if (props.letter_proofing.letter_expired) {
    letterStatus = (
      <FormattedMessage description="Verification letter expired" defaultMessage="Verification letter expired" />
    );
  } else
    letterStatus = (
      <FormattedMessage description="Verification letter requested" defaultMessage="Verification letter requested" />
    );

  return (
    <figure>
      <table>
        <tbody>
          <tr className="link">
            <td>
              <strong>{letterStatus}</strong>
            </td>
            <td>
              <Link to="verify-identity/#letter-proofing">
                <FormattedMessage description="link to detail page" defaultMessage="continue verification" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </figure>
  );
}

function VerificationProgress(props: { identities: UserIdentities }): JSX.Element | null {
  if (!props.identities.is_verified) {
    return null;
  }
  return (
    <figure>
      <table>
        <tbody>
          <tr className="status">
            <td>
              <strong>
                <FormattedMessage description="Verified identity" defaultMessage="Your identity has been verified" />
              </strong>
            </td>
            <td>
              <Link to="verify-identity/">
                <FormattedMessage description="link to detail page" defaultMessage="see details" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </figure>
  );
}

/**
 * Recommendation for adding name, security key and phone number and verification of identity
 */
function RecommendationAddingSecurityKey(props: RequestCredentialsResponse): JSX.Element | null {
  if (props.credentials) {
    return null;
  }

  return (
    <AccordionItemTemplate
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
  const verifiedNumber = props.phones.some((num) => num.verified === true);

  // if user has phone number and it is verified, do not show accordion item
  if (props.phones.length && verifiedNumber) {
    return null;
  }
  // if user has no phone number or not confirmed, show accordion item with description and title
  if (!props.phones.length) {
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
    <AccordionItemTemplate icon={<FontAwesomeIcon icon={faIdCard as IconProp} />} title={title} additionalInfo={null}>
      <p>{description}</p>
      <Link key="verify-identity" to="verify-identity/">
        <FormattedMessage defaultMessage="Go to Identity" description="go to identity" />
      </Link>
    </AccordionItemTemplate>
  );
}

/**
 * Renders the start page
 */
export default function Profile(): JSX.Element {
  const intl = useIntl();
  const display_name = useDashboardAppSelector((state) => state.personal_data.display_name);
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const phones = useDashboardAppSelector((state) => state.phones.phones);
  const dispatch = useDashboardAppDispatch();
  const tokens = credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );
  const identities = useDashboardAppSelector((state) => state.identities);
  const letter_proofing = useDashboardAppSelector((state) => state.letter_proofing);
  let username;
  let recommendation;
  let progress;

  if (!display_name && emails.length > 0) {
    username = emails.filter((mail) => mail.primary)[0].email;
  } else {
    username = display_name;
  }

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Start",
      defaultMessage: "Start | eduID",
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      // call requestCredentials once app is loaded
      dispatch(requestCredentials());
      dispatch(fetchLetterProofingState());
    }
  }, [isLoaded]);

  if (!identities.nin?.verified || !phones.length || !tokens.length || !display_name) {
    recommendation = (
      <article>
        <div className="intro">
          <h3>
            <FormattedMessage description="recommendation title" defaultMessage="Recommended actions for you" />
          </h3>
          <p>
            <FormattedMessage
              description="recommendation title"
              defaultMessage="To get the most out of eduID we recommend that you follow the below recommendations."
            />
          </p>
        </div>
        <Accordion allowMultipleExpanded allowZeroExpanded>
          <RecommendationAddingName display_name={display_name} />
          <RecommendationPhone phones={phones} />
          <RecommendationVerifyIdentity identities={identities} />
          <RecommendationAddingSecurityKey credentials={tokens} />
        </Accordion>
      </article>
    );
  }

  if (identities.is_verified || letter_proofing.letter_sent !== undefined) {
    progress = (
      <article>
        <div className="intro">
          <h3>
            <FormattedMessage description="Currently in progress title" defaultMessage="Currently in progress" />
          </h3>
        </div>
        <VerificationProgress identities={identities} />
        <LetterProofingProgress letter_proofing={letter_proofing} />
      </article>
    );
  }

  return (
    <React.Fragment>
      <div className="breadcrumb">
        <FontAwesomeIcon icon={faHome as IconProp} />
        <FormattedMessage description="Start" defaultMessage="Start" />
      </div>
      <div className="intro">
        <h1>
          <FormattedMessage
            defaultMessage="Welcome, {username}!"
            description="start main title"
            values={{
              username: <strong>{username}</strong>,
            }}
          />
        </h1>
        <div className="lead">
          <p>
            <FormattedMessage
              description="start page lead title"
              defaultMessage="Make the most out of eduID by reviewing your information."
            />
          </p>
        </div>
      </div>
      {recommendation}
      {progress}
    </React.Fragment>
  );
}
