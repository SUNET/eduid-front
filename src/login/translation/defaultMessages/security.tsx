import React from "react";
import { FormattedMessage } from "react-intl";

// Translations of messages from the Security backend
export const apiResponses = {
  "security.no_reauthn": <FormattedMessage id="security.no_reauthn" defaultMessage="Missing authentication" />,
  "security.stale_authn_info": (
    <FormattedMessage id="security.stale_authn_info" defaultMessage="The authentication expired. Please try again." />
  ),
  "security.webauthn-attestation-fail": (
    <FormattedMessage
      id="security.webauthn-attestation-fail"
      defaultMessage="Failed to verify the attestation for the security key."
    />
  ),
  "security.webauthn-metadata-fail": (
    <FormattedMessage
      id="security.webauthn-metadata-fail"
      defaultMessage="Failed to validate the security key against metadata."
    />
  ),
};
