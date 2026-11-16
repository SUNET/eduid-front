import { FormattedMessage } from "react-intl";

// The three "Error: dom_error.*" ids are an accident of how the message used to be built: the text of an
// `Error("dom_error.…")` was shown as `${error.name}: ${error.message}`. The ids further down are the ids that
// navigatorCredentials.ts sets directly, without the prefix, like the ids elsewhere. The old ones should be renamed
// to match.
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
  "dom_error.already_registered": (
    <FormattedMessage
      id="dom_error.already_registered"
      defaultMessage="This security key or passkey is already registered. Try another one."
    />
  ),
  "dom_error.not_supported": (
    <FormattedMessage
      id="dom_error.not_supported"
      defaultMessage="This browser or device does not support this kind of security key or passkey."
    />
  ),
  "dom_error.security_error": (
    <FormattedMessage
      id="dom_error.security_error"
      defaultMessage="The browser blocked the request for security reasons."
    />
  ),
};
