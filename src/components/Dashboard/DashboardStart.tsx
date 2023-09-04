import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import { UserIdentities } from "apis/eduidPersonalData";
import { CredentialType } from "apis/eduidSecurity";
import AccordionItemTemplate from "components/Common/AccordionItemTemplate";
import { InformationContainer } from "components/Common/InformationContainer";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import { LetterProofingState } from "slices/LetterProofing";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import LetterProofing from "./LetterProofing";
import { Recommendations } from "./Recommendations";

function VerificationProgress(props: { identities: UserIdentities }): JSX.Element {
  const credentials = useDashboardAppSelector((state) => state.security.credentials);
  const tokens = credentials.filter(
    (cred: CredentialType) =>
      cred.credential_type == "security.u2f_credential_type" ||
      cred.credential_type == "security.webauthn_credential_type"
  );

  if (!props.identities.is_verified) {
    return (
      <>
        <figure className="status unverified">
          <div>
            <h3>
              {!props.identities.nin && !props.identities.svipe && !props.identities.eidas ? (
                <FormattedMessage
                  description="verification status heading unverified"
                  defaultMessage="Your identity is not verified."
                />
              ) : (
                <FormattedMessage
                  description="verification status heading after password reset"
                  defaultMessage="Your identity is no longer verified after password reset."
                />
              )}
            </h3>
            <p className="help-text">
              <FormattedMessage
                description="verification status sub text"
                defaultMessage="Please see the recommended actions below."
              />
            </p>
          </div>
        </figure>
        {!props.identities.nin?.verified && (
          <InformationContainer
            heading={
              <FormattedMessage
                description="For Digital National Exam heading"
                defaultMessage="Verification for the Digital National Exam"
              />
            }
            paragraph={
              <FormattedMessage
                description="verify identity additional info"
                defaultMessage={`It is imperative that you complete the verification process. 
                You should complete the verification {frejaeID} or {post}, and also {securityKey}. 
                To initiate the verification process,click on {link} below.`}
                values={{
                  frejaeID: <strong>with a digital ID-CARD</strong>,
                  post: <strong>by post</strong>,
                  securityKey: <strong>register a security key</strong>,
                  link: <strong>Verify your identity</strong>,
                }}
              />
            }
          />
        )}
      </>
    );
  }
  return (
    <div className="status verified">
      <div className="information-icon-container">
        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
        <h3>
          <FormattedMessage
            description="verification status heading verified"
            defaultMessage="Your identity is verified."
          />
        </h3>
      </div>
      <p className="help-text">
        <FormattedMessage description="verification status sub text" defaultMessage="Your eduID is ready to use." />
      </p>
    </div>
  );
}

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
      <FormattedMessage
        description="Verification letter expired, status"
        defaultMessage="A verification letter has been expired"
      />
    );
  } else {
    letterStatus = (
      <FormattedMessage
        description="Verification letter requested, status"
        defaultMessage="A verification letter has been requested."
      />
    );
  }

  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      <AccordionItemTemplate title={letterStatus} additionalInfo="" uuid="se-letter" disabled={false}>
        <LetterProofing disabled={false} />
      </AccordionItemTemplate>
    </Accordion>
  );
}

/**
 * Renders the start page
 */
export default function Start(): JSX.Element {
  const intl = useIntl();
  const display_name = useDashboardAppSelector((state) => state.personal_data.response?.display_name);
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useDashboardAppDispatch();
  const identities = useDashboardAppSelector((state) => state.identities);
  const letter_proofing = useDashboardAppSelector((state) => state.letter_proofing);
  let username;
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
      dispatch(fetchLetterProofingState());
    }
  }, [isLoaded]);

  // when the user has verified their identity with swedish option, we don't need to show the letter proofing progress
  if (!identities.nin?.verified && letter_proofing.letter_sent !== undefined) {
    progress = (
      <article>
        <h2>
          <FormattedMessage description="Currently in progress title" defaultMessage="Currently in progress" />
        </h2>
        <LetterProofingProgress letter_proofing={letter_proofing} />
      </article>
    );
  }

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faHome} currentPage="Start" />
      <section className="intro">
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
      </section>
      <article className="intro">
        <h2>
          <FormattedMessage description="progress title" defaultMessage="Your identity verification progress" />
        </h2>
        <VerificationProgress identities={identities} />
      </article>
      {progress}
      <Recommendations />
    </React.Fragment>
  );
}
