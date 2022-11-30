import { FormattedMessage } from "react-intl";

// Translations of messages from the Svipe backend
export const apiResponses = {
  "svipe_id.authn_request_failed": (
    <FormattedMessage
      id="svipe_id.authn_request_failed"
      defaultMessage="Svipe authentication request failed.Please try again"
    />
  ),

  "svipe_id.method_not_available": (
    <FormattedMessage
      id="svipe_id.method_not_available"
      defaultMessage="Svipe is not available for this account. Please try another verification method."
    />
  ),

  "svipe_id.identity_verify_success": (
    <FormattedMessage id="svipe_id.identity_verify_success" defaultMessage="Svipe identity verification success" />
  ),

  "svipe_id.authorization_fail": (
    <FormattedMessage id="svipe_id.authorization_fail" defaultMessage="Svipe authorization failed." />
  ),

  "svipe_id.not_found": <FormattedMessage id="svipe_id.not_found" defaultMessage="Svipe id not found." />,
};
