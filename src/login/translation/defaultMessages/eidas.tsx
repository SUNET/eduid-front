import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "eidas.reauthn_expired": (
    <FormattedMessage id="eidas.reauthn_expired" defaultMessage={`Authentication has expired. Please try again.`} />
  ),

  "eidas.authn_context_mismatch": (
    <FormattedMessage id="eidas.authn_context_mismatch" defaultMessage={`Wrong authentication context received`} />
  ),

  "eidas.nin_not_matching": (
    <FormattedMessage
      id="eidas.nin_not_matching"
      defaultMessage={`The identity does not match the one verified for this eduID`}
    />
  ),

  "eidas.identity_not_matching": (
    <FormattedMessage
      id="eidas.identity_not_matching"
      defaultMessage={`The identity does not match the one verified for this eduID`}
    />
  ),
  "eidas.token_not_found": <FormattedMessage id="eidas.token_not_found" defaultMessage={`U2F token not found`} />,

  "eidas.token_not_in_credentials_used": (
    <FormattedMessage id="eidas.token_not_in_credentials_used" defaultMessage={`U2F token not used for login`} />
  ),

  "eidas.nin_already_verified": (
    <FormattedMessage id="eidas.nin_already_verified" defaultMessage={`You have already verified your identity`} />
  ),

  "eidas.nin_verify_success": (
    <FormattedMessage id="eidas.nin_verify_success" defaultMessage={`Identity verified successfully`} />
  ),

  "eidas.token_verify_success": (
    <FormattedMessage id="eidas.token_verify_success" defaultMessage={`U2F token verified successfully`} />
  ),

  "actions.action-completed": <FormattedMessage id="actions.action-completed" defaultMessage={`Success`} />,
};
