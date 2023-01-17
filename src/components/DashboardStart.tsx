import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCircleInfo, faHome } from "@fortawesome/free-solid-svg-icons";
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
      <div className="verification-status unverified">
        <FontAwesomeIcon icon={faCircleInfo as IconProp} />
        <p>
          <FormattedMessage description="Your identity" defaultMessage="Your identity" />
        </p>
        <span className="badge unverified">
          <FormattedMessage description="progress title" defaultMessage="unverified" />
        </span>
      </div>
    );
  }
  return (
    <div className="verification-status verified">
      <FontAwesomeIcon icon={faCheck as IconProp} />
      <p>
        <FormattedMessage description="Your identity" defaultMessage="Your identity" />
      </p>
      <span className="badge verified">
        <FormattedMessage description="progress title" defaultMessage="verified" />
      </span>
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
    <figure className="table-responsive progress-summary">
      <table>
        <tbody>
          <tr className="border-row">
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

/**
 * Renders the start page
 */
export default function Start(): JSX.Element {
  const intl = useIntl();
  const display_name = useDashboardAppSelector((state) => state.personal_data.display_name);
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

  if (letter_proofing.letter_sent !== undefined) {
    progress = (
      <article>
        <div className="intro">
          <h3>
            <FormattedMessage description="Currently in progress title" defaultMessage="Currently in progress" />
          </h3>
        </div>
        <LetterProofingProgress letter_proofing={letter_proofing} />
      </article>
    );
  }

  return (
    <React.Fragment>
      <DashboardBreadcrumbs pageIcon={faHome} currentPage="Start" />
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
      <article>
        <div className="intro">
          <h3>
            <FormattedMessage description="progress title" defaultMessage="Your identity verification progress" />
          </h3>
        </div>
        <VerificationProgress identities={identities} />
      </article>
      <Recommendations />
      {progress}
    </React.Fragment>
  );
}
