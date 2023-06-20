import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleCheck, faCircleExclamation, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import { UserIdentities } from "apis/eduidPersonalData";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { LetterProofingState } from "reducers/LetterProofing";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { Recommendations } from "./Recommendations";

function VerificationProgress(props: { identities: UserIdentities }): JSX.Element {
  if (!props.identities.is_verified) {
    return (
      <figure className="verification-status unverified">
        <FontAwesomeIcon icon={faCircleExclamation as IconProp} />
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
    );
  }
  return (
    <div className="verification-status verified">
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
      <FormattedMessage description="Verification letter expired" defaultMessage="Verification letter expired" />
    );
  } else
    letterStatus = (
      <FormattedMessage description="Verification letter requested" defaultMessage="Verification letter requested" />
    );

  return (
    <div className="data-container">
      {letterStatus}
      <Link to="verify-identity/#letter-proofing">
        <FormattedMessage description="link to detail page" defaultMessage="order a new code" />
      </Link>
    </div>
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
      <Recommendations />
      {progress}
    </React.Fragment>
  );
}
