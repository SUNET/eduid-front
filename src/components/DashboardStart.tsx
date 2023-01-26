import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faCircleCheck,
  faCircleExclamation,
  faExclamation,
  faHome,
  faIdCard,
  faUnlockKeyhole,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchLetterProofingState } from "apis/eduidLetterProofing";
import { UserIdentities } from "apis/eduidPersonalData";
import { useDashboardAppDispatch, useDashboardAppSelector } from "dashboard-hooks";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { LetterProofingState } from "reducers/LetterProofing";
import { DashboardBreadcrumbs } from "./DashboardBreadcrumbs";
import { Recommendations } from "./Recommendations";

interface IdentificationStepTypes {
  account_created: boolean;
  verified_identity: boolean;
  nin_verified: boolean;
}

function IdentificationIndicator(props: { identities: UserIdentities }): JSX.Element {
  // fist step is user created account
  // second step is verified identity with eidas or svipe
  // the last step is to verify with a nin
  const [isFinishedStep, setIsFinishedStep] = useState<IdentificationStepTypes>({
    account_created: true,
    verified_identity: false,
    nin_verified: false,
  });

  useEffect(() => {
    if (props.identities.nin?.verified) {
      setIsFinishedStep({
        account_created: true,
        verified_identity: true,
        nin_verified: true,
      });
    } else if (props.identities.svipe?.verified || props.identities.eidas?.verified) {
      setIsFinishedStep({
        account_created: true,
        verified_identity: true,
        nin_verified: false,
      });
    }
  }, [props.identities]);

  return (
    <article>
      <div className="intro">
        <h2>
          <FormattedMessage description="progress title" defaultMessage="Your identity verification progress" />
        </h2>
      </div>
      <div className="indicator">
        <div className="step finished">
          <FontAwesomeIcon className="icon-unlock" icon={faUser as IconProp} />
          <FontAwesomeIcon className="icon-lock" icon={faCheck as IconProp} />
        </div>
        <div className="border-line" />
        <div className={isFinishedStep.verified_identity ? "step finished" : "step"}>
          <FontAwesomeIcon className="icon-unlock" icon={faIdCard as IconProp} />
          <FontAwesomeIcon
            className="icon-lock"
            icon={isFinishedStep.verified_identity ? faCheck : (faExclamation as IconProp)}
          />
        </div>
        <div className="border-line" />
        <div className={isFinishedStep.verified_identity ? "step finished" : "step"}>
          <FontAwesomeIcon className="icon-unlock" icon={faUnlockKeyhole as IconProp} />
          <FontAwesomeIcon
            className="icon-lock"
            icon={isFinishedStep.verified_identity ? faCheck : (faExclamation as IconProp)}
          />
        </div>
      </div>
      <div className="indicator-description">
        <span>
          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
          <strong>
            <FormattedMessage description="first step" defaultMessage="Create eduID" />
          </strong>
        </span>
        <span>
          <FontAwesomeIcon icon={isFinishedStep.nin_verified ? faCircleCheck : (faCircleExclamation as IconProp)} />
          <strong>
            <FormattedMessage description="second step" defaultMessage="Verify your identity" />
          </strong>
        </span>
        <span>
          <FontAwesomeIcon icon={isFinishedStep.nin_verified ? faCircleCheck : (faCircleExclamation as IconProp)} />
          <strong>
            {isFinishedStep.nin_verified ? (
              <FormattedMessage
                description="last step"
                defaultMessage="Congratulations to completing your identity verification"
              />
            ) : (
              <FormattedMessage
                description="finished last step"
                defaultMessage="To complete the last step, you need to verify a Swedish national ID number"
              />
            )}
          </strong>
        </span>
      </div>
    </article>
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
      <strong>{letterStatus}</strong>

      <Link to="verify-identity/#letter-proofing">
        <FormattedMessage description="link to detail page" defaultMessage="continue verification" />
      </Link>
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
          <h2>
            <FormattedMessage description="Currently in progress title" defaultMessage="Currently in progress" />
          </h2>
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
      <IdentificationIndicator identities={identities} />
      <Recommendations />
      {progress}
    </React.Fragment>
  );
}
