import { FormattedMessage } from "react-intl";

// Translations of messages from the Svipe backend
export const apiResponses = {
  "bankid.authn_context_mismatch": (
    <FormattedMessage id="bankid.authn_context_mismatch" defaultMessage="Wrong authentication context received" />
  ),

  "bankid.identity_not_matching": (
    <FormattedMessage
      id="bankid.identity_not_matching"
      defaultMessage="The identity does not match the one verified for this eduID"
    />
  ),

  "bankid.identity_already_verified": (
    <FormattedMessage id="bankid.identity_already_verified" defaultMessage="You have already verified your identity" />
  ),

  "bankid.no_redirect_url": (
    <FormattedMessage id="bankid.no_redirect_url" defaultMessage="MFA authentication is missing a redirect URL" />
  ),

  "bankid.token_not_found": <FormattedMessage id="bankid.token_not_found" defaultMessage="U2F token not found" />,

  "bankid.attribute_missing": (
    <FormattedMessage id="bankid.attribute_missing" defaultMessage="BankID attribute is missing" />
  ),

  "bankid.method_not_available": (
    <FormattedMessage id="bankid.method_not_available" defaultMessage="BankID method is not available" />
  ),

  "bankid.must_authenticate": (
    <FormattedMessage id="bankid.must_authenticate" defaultMessage="BankId must authenticate" />
  ),

  "bankid.not_found": <FormattedMessage id="bankid.not_found" defaultMessage="BankID not found" />,

  "bankid.mfa_authn_success": <FormattedMessage id="bankid.mfa_authn_success" defaultMessage="Success" />,

  "bankid.credential_verify_success": (
    <FormattedMessage id="bankid.credential_verify_success" defaultMessage="Success" />
  ),

  "bankid.identity_verify_success": <FormattedMessage id="bankid.identity_verify_success" defaultMessage="Success" />,
};
