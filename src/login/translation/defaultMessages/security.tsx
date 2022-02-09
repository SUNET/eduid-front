import React from "react";
import { FormattedMessage } from "react-intl";

// Translations of messages from the Security backend
export const apiResponses = {
  "security.no_reauthn": <FormattedMessage id="security.no_reauthn" defaultMessage="Missing authentication" />,
  "security.stale_authn_info": (
    <FormattedMessage id="security.stale_authn_info" defaultMessage="The authentication expired. Please try again." />
  ),
};
