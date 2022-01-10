import React from "react";
import { FormattedMessage } from "react-intl";

// Translations of messages from the Ladok backend
export const apiResponses = {
  "security.no_reauthn": <FormattedMessage id="security.no_reauthn" defaultMessage="Missing authentication" />,
  "security.stale_reauthn": <FormattedMessage id="security.stale_reauthn" defaultMessage="Expired authentication" />,
};
