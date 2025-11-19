import { FormattedMessage } from "react-intl";

export const credentialErrors = {
  "Error: dom_error.not_allowed": (
    <FormattedMessage id="Error: dom_error.not_allowed" defaultMessage={`Action was interrupted.`} />
  ),
  "Error: dom_error.unable_to_obtain_credential": (
    <FormattedMessage
      id="Error: dom_error.unable_to_obtain_credential"
      defaultMessage={`Unable to obtain credential.`}
    />
  ),
  "Error: dom_error.unable_to_create_credential": (
    <FormattedMessage
      id="Error: dom_error.unable_to_create_credential"
      defaultMessage={`Unable to create credential.`}
    />
  ),
};
