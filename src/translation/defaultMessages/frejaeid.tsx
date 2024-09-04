import { FormattedMessage } from "react-intl";

// Translations of messages from the Svipe backend
export const apiResponses = {
  "freja_eid.authn_request_failed": (
    <FormattedMessage
      id="freja_eid.authn_request_failed"
      defaultMessage="Freja eID authentication request failed.Please try again"
    />
  ),

  "freja_eid.method_not_available": (
    <FormattedMessage
      id="freja_eid.method_not_available"
      defaultMessage="Freja eID is not available for this account. Please try another verification method."
    />
  ),

  "freja_eid.identity_verify_success": (
    <FormattedMessage
      id="freja_eid.identity_verify_success"
      defaultMessage="Freja eID identity verification success."
    />
  ),

  "freja_eid.authorization_fail": (
    <FormattedMessage id="freja_eid.authorization_fail" defaultMessage="Freja eID authorization failed." />
  ),

  "freja_eid.frontend_action_not_supported": (
    <FormattedMessage
      id="freja_eid.frontend_action_not_supported"
      defaultMessage="Freja eID frontend action not supported."
    />
  ),

  "freja_eid.registration_level_not_satisfied": (
    <FormattedMessage
      id="freja_eid.registration_level_not_satisfied"
      defaultMessage="Freja eID registration level not satisfied."
    />
  ),
};
