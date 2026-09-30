import { faCheck, faLightbulb, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

export const ServiceInfo = () => {
  const signup = useAppSelector((state) => state.signup);
  const authnReq = signup?.state?.idp_authn_requirements;
  const externalMfa = signup?.state?.external_mfa;
  const idp_service_info = signup?.state?.idp_service_info;
  const credentialsCompleted = signup?.state?.credentials.webauthn_registered;
  const locale = useAppSelector((state) => state.intl.locale);
  const service_name = idp_service_info?.display_name?.[locale] || idp_service_info?.display_name?.["en"] || undefined;

  if (!service_name) return null;
  const requireMfa = authnReq?.require_mfa;
  const level = authnReq?.minimum_assurance_level;
  const hasRequirements = requireMfa || level;
  const isVerified = Boolean(externalMfa);
  const next_page = signup.next_page;

  const renderRecommendation = () => {
    const pastEntry = next_page === "SIGNUP_CAPTCHA" || next_page === "SIGNUP_TOU" || next_page === "SIGNUP_ENTER_CODE";
    if (isVerified && credentialsCompleted) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage id="entry.complete.badge" defaultMessage="COMPLETE" description="complete badge" />
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
          <span className="suggestion-txt success">
            <FormattedMessage
              id="entry.allComplete"
              defaultMessage="You're all set to access {serviceName}."
              description="all requirements complete"
              values={{ serviceName: <strong>{service_name}</strong> }}
            />
          </span>
        </>
      );
    }

    if (!isVerified && next_page === "SIGNUP_CREDENTIALS" && credentialsCompleted && requireMfa) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage id="entry.complete.badge" defaultMessage="COMPLETE" description="complete badge" />
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </div>
          <span className="suggestion-txt success">
            <FormattedMessage
              id="entry.securityKeyRegistered"
              defaultMessage="You're ready to continue to {serviceName}."
              description="security key registered success"
              values={{ serviceName: <strong>{service_name}</strong> }}
            />
          </span>
        </>
      );
    }

    if (isVerified && next_page === "SIGNUP_CREDENTIALS") {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage
                id="entry.recommendation.badge"
                defaultMessage="RECOMMENDED"
                description="recommendation badge"
              />
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.recommendation.al3.verified.credentialsStep"
              defaultMessage="Your identity is verified to access {serviceName}. We recommend registering your sign-in method below for stronger account protection."
              description="al3 recommendation after verification, credentials step"
              values={{
                serviceName: <strong>{service_name}</strong>,
              }}
            />
          </span>
        </>
      );
    }

    if (isVerified && next_page === "SIGNUP_USER_CREATED") {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage
                id="entry.recommendation.badge"
                defaultMessage="RECOMMENDED"
                description="recommendation badge"
              />
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.recommendation.al3.verified.userCreated"
              defaultMessage="Your identity is verified to access {serviceName}. We recommend registering a sign-in method on the Security page in eduID for stronger account protection."
              description="al3 recommendation after verification, user created"
              values={{
                serviceName: <strong>{service_name}</strong>,
              }}
            />
          </span>
        </>
      );
    }

    if (isVerified) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage
                id="entry.recommendation.badge"
                defaultMessage="RECOMMENDED"
                description="recommendation badge"
              />
              <FontAwesomeIcon icon={faLightbulb} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.recommendation.al3.verified"
              defaultMessage="Your identity is verified to access {serviceName}. We recommend registering your sign-in method in Step 4 for stronger account protection."
              description="al3 recommendation after verification"
              values={{
                serviceName: <strong>{service_name}</strong>,
              }}
            />
          </span>
        </>
      );
    }

    if (!isVerified && pastEntry && (level === "al3" || level === "al2")) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage id="entry.requirement.badge" defaultMessage="REQUIRED" description="required badge" />
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.requirement.verifiedIdentity.pastEntry"
              defaultMessage="A verified identity is required to access {serviceName}. Go back to Step 1, or verify your identity later on the Identity page in eduID."
              description="require verified identity, past entry"
              values={{ serviceName: <strong>{service_name}</strong> }}
            />
          </span>
        </>
      );
    }

    if (!isVerified && pastEntry && requireMfa) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage id="entry.requirement.badge" defaultMessage="REQUIRED" description="required badge" />
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.requirement.step4"
              defaultMessage="Multi-factor authentication is required to access {serviceName}. Register a security key in Step 4 to complete this."
              description="require security key at step 4"
              values={{ serviceName: <strong>{service_name}</strong> }}
            />
          </span>
        </>
      );
    }

    if (!isVerified && next_page === "SIGNUP_CREDENTIALS" && (level === "al3" || level === "al2" || requireMfa)) {
      return (
        <>
          <div className="recommendation-box">
            <span className="badge">
              <FormattedMessage id="entry.requirement.badge" defaultMessage="REQUIRED" description="required badge" />
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.requirement.credentialsStep"
              defaultMessage="Multi-factor authentication is required to access {serviceName}. Register a security key below to complete this."
              description="require security key on credentials step"
              values={{ serviceName: <strong>{service_name}</strong> }}
            />
          </span>
        </>
      );
    }

    if (level === "al3" || level === "al2" || requireMfa) {
      return (
        <>
          <div className="recommendation-box">
            <span>
              <FormattedMessage id="entry.requirement.badge" defaultMessage="REQUIRED" description="required badge" />
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <span className="suggestion-txt">
            <FormattedMessage
              id="entry.recommendation.al"
              defaultMessage={`A verified identity is required to access {serviceName}. Register with a digital ID below to complete this now.`}
              description="al3 recommendation"
              values={{
                serviceName: <strong>{service_name}</strong>,
              }}
            />
          </span>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {/* <div className="destination-info">
        <p className="text-bold">
          <FormattedMessage
            id="entry.accessIntro"
            defaultMessage="In order to access {name}"
            description="Signup first page lead text"
            values={{ name: <span>{service_name}</span> }}
          />
        </p>
      </div> */}

      {hasRequirements && <div className="access-requirements">{renderRecommendation()}</div>}
    </>
  );
};
