import { faCircleExclamation, faLightbulb, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

type BadgeType = "complete" | "recommended" | "required";

type Recommendation = {
  badgeType: BadgeType;
  success?: boolean;
  message: { id: string; defaultMessage: string; description: string };
};

type RecommendationInput = {
  isVerified: boolean;
  credentialsCompleted: boolean;
  requireMfa: boolean;
  mfaRequired: boolean;
  verifiedIdentityRequired: boolean;
  pastPage: boolean;
  nextPage?: string;
};

const BADGE_CONFIG: Record<
  BadgeType,
  { id: string; defaultMessage: string; description: string; icon: FontAwesomeIconProps["icon"] }
> = {
  complete: {
    id: "entry.complete.badge",
    defaultMessage: "COMPLETE",
    description: "complete badge",
    icon: faThumbsUp,
  },
  recommended: {
    id: "entry.recommendation.badge",
    defaultMessage: "RECOMMENDED",
    description: "recommendation badge",
    icon: faLightbulb,
  },
  required: {
    id: "entry.requirement.badge",
    defaultMessage: "REQUIRED",
    description: "required badge",
    icon: faCircleExclamation,
  },
};

const Badge = ({ type }: { type: BadgeType }) => {
  const { id, defaultMessage, description, icon } = BADGE_CONFIG[type];
  return (
    <div className="recommendation-box">
      <span className="badge">
        <FontAwesomeIcon icon={icon} />
        <FormattedMessage id={id} defaultMessage={defaultMessage} description={description} />
      </span>
    </div>
  );
};

const MESSAGES = {
  allComplete: {
    id: "entry.allComplete",
    defaultMessage: "You're all set to access {serviceName}.",
    description: "all requirements complete",
  },
  securityKeyRegistered: {
    id: "entry.securityKeyRegistered",
    defaultMessage: "You're ready to continue to {serviceName}.",
    description: "security key registered success",
  },
  verifiedCredentialsStep: {
    id: "entry.recommendation.al3.verified.credentialsStep",
    defaultMessage:
      "Your identity is verified to access {serviceName}. We recommend registering your sign-in method below for stronger account protection.",
    description: "al3 recommendation after verification, credentials step",
  },
  verifiedUserCreated: {
    id: "entry.recommendation.al3.verified.userCreated",
    defaultMessage:
      "Your identity is verified to access {serviceName}. We recommend registering a sign-in method on the Security page in eduID for stronger account protection.",
    description: "al3 recommendation after verification, user created",
  },
  verified: {
    id: "entry.recommendation.al3.verified",
    defaultMessage:
      "Your identity is verified to access {serviceName}. We recommend registering your sign-in method in Step 4 for stronger account protection.",
    description: "al3 recommendation after verification",
  },
  verifiedIdentityPastEntry: {
    id: "entry.requirement.verifiedIdentity.pastEntry",
    defaultMessage:
      "A verified identity is required to access {serviceName}. Go back to Step 1, or verify your identity later on the Identity page in eduID.",
    description: "require verified identity, past entry",
  },
  requirementStep4: {
    id: "entry.requirement.step4",
    defaultMessage:
      "Multi-factor authentication is required to access {serviceName}. Register a security key in Step 4 to complete this.",
    description: "require security key at step 4",
  },
  requirementCredentialsStep: {
    id: "entry.requirement.credentialsStep",
    defaultMessage:
      "Multi-factor authentication is required to access {serviceName}. Register a security key below to complete this.",
    description: "require security key on credentials step",
  },
  recommendationAl3: {
    id: "entry.recommendation.al3",
    defaultMessage:
      "A verified identity is required to access {serviceName}. Register with a digital ID below to complete this now.",
    description: "al3 recommendation",
  },
};

const getVerified = ({ isVerified, credentialsCompleted, nextPage }: RecommendationInput): Recommendation | null => {
  if (!isVerified) return null;
  if (credentialsCompleted) {
    return { badgeType: "complete", success: true, message: MESSAGES.allComplete };
  }
  if (nextPage === "SIGNUP_CREDENTIALS") {
    return { badgeType: "recommended", message: MESSAGES.verifiedCredentialsStep };
  }
  if (nextPage === "SIGNUP_USER_CREATED") {
    return { badgeType: "recommended", message: MESSAGES.verifiedUserCreated };
  }
  return { badgeType: "recommended", message: MESSAGES.verified };
};

const getUnverified = ({
  credentialsCompleted,
  requireMfa,
  mfaRequired,
  verifiedIdentityRequired,
  pastPage,
  nextPage,
}: RecommendationInput): Recommendation | null => {
  if (nextPage === "SIGNUP_CREDENTIALS" && credentialsCompleted && requireMfa) {
    return { badgeType: "complete", success: true, message: MESSAGES.securityKeyRegistered };
  }
  if (pastPage && verifiedIdentityRequired) {
    return { badgeType: "required", message: MESSAGES.verifiedIdentityPastEntry };
  }
  if (pastPage && requireMfa) {
    return { badgeType: "required", message: MESSAGES.requirementStep4 };
  }
  if (nextPage === "SIGNUP_CREDENTIALS" && mfaRequired) {
    return { badgeType: "required", message: MESSAGES.requirementCredentialsStep };
  }
  if (mfaRequired) {
    return { badgeType: "required", message: MESSAGES.recommendationAl3 };
  }
  return null;
};

const getRecommendation = (input: RecommendationInput): Recommendation | null => {
  return input.isVerified ? getVerified(input) : getUnverified(input);
};

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
  const nextPage = signup.next_page;

  const renderRecommendation = () => {
    const pastPage = nextPage === "SIGNUP_CAPTCHA" || nextPage === "SIGNUP_TOU" || nextPage === "SIGNUP_ENTER_CODE";
    const serviceNameValue = { serviceName: <strong>{service_name}</strong> };
    const mfaRecommended = level === "al3" || level === "al2" || requireMfa;
    const verifiedIdentityRequired = level === "al3" || level === "al2";

    const recommendation = getRecommendation({
      isVerified,
      credentialsCompleted: Boolean(credentialsCompleted),
      requireMfa: Boolean(requireMfa),
      mfaRequired: Boolean(mfaRecommended),
      verifiedIdentityRequired,
      pastPage,
      nextPage,
    });

    if (!recommendation) return null;

    return (
      <>
        <Badge type={recommendation.badgeType} />
        <span className="suggestion-txt md">
          <FormattedMessage
            id={recommendation.message.id}
            defaultMessage={recommendation.message.defaultMessage}
            description={recommendation.message.description}
            values={serviceNameValue}
          />
        </span>
      </>
    );
  };

  return <>{hasRequirements && <div className="access-requirements">{renderRecommendation()}</div>}</>;
};
