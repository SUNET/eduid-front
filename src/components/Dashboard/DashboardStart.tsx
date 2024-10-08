import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck, faCircleExclamation, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import { UserIdentities } from "apis/eduidPersonalData";
import AccordionItemTemplate from "components/Common/AccordionItemTemplate";
import Splash from "components/Common/Splash";
import { useAppDispatch, useAppSelector } from "eduid-hooks";
import { useEffect } from "react";
import { Accordion } from "react-accessible-accordion";
import { FormattedMessage, useIntl } from "react-intl";
import { LetterProofingState } from "slices/LetterProofing";
import { AccountId } from "./AccountId";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import LetterProofing from "./LetterProofing";
import { Recommendations } from "./Recommendations";

function VerificationProgress(props: { identities: UserIdentities }): JSX.Element {
  if (!props.identities.is_verified) {
    return (
      <figure className="status unverified">
        <FontAwesomeIcon icon={faCircleExclamation as IconProp} />
        <div>
          <h3>
            {!props.identities.nin && !props.identities.freja && !props.identities.eidas ? (
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
    );
  }
  return (
    <div className="status verified">
      <FontAwesomeIcon icon={faCircleCheck as IconProp} />
      <div>
        <h3>
          <FormattedMessage
            description="verification status heading verified"
            defaultMessage="Your identity is verified."
          />
        </h3>
        <p className="help-text">
          <FormattedMessage description="verification status sub text" defaultMessage="Your eduID is ready to use." />
        </p>
      </div>
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
  const chosen_given_name = useAppSelector((state) => state.personal_data.response?.chosen_given_name);
  const given_name = useAppSelector((state) => state.personal_data.response?.given_name);
  const surname = useAppSelector((state) => state.personal_data.response?.surname);
  const emails = useAppSelector((state) => state.emails.emails);
  const isLoaded = useAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useAppDispatch();
  const identities = useAppSelector((state) => state.personal_data.response?.identities);
  const letter_proofing = useAppSelector((state) => state.letter_proofing);
  let username;
  let progress;

  if (!chosen_given_name && !given_name && emails.length > 0) {
    username = emails.filter((mail) => mail.primary)[0].email;
  } else if (chosen_given_name) {
    username = `${chosen_given_name} ${surname}`;
  } else if (given_name) {
    username = `${given_name} ${surname}`;
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
  if (!identities?.nin?.verified && letter_proofing.letter_sent !== undefined) {
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
    <Splash showChildren={isLoaded}>
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

      <AccountId />

      <article className="intro">
        <h2>
          <FormattedMessage description="progress title" defaultMessage="Your identity verification progress" />
        </h2>
        {identities && <VerificationProgress identities={identities} />}
      </article>
      {progress}
      <Recommendations />
    </Splash>
  );
}
