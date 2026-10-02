import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "samleid.authn_context_mismatch": (
    <FormattedMessage id="samleid.authn_context_mismatch" defaultMessage="Wrong authentication context received" />
  ),

  "samleid.authn_instant_too_old": (
    <FormattedMessage id="samleid.authn_instant_too_old" defaultMessage="Authentication instant is too old" />
  ),

  "samleid.frontend_action_not_supported": (
    <FormattedMessage
      id="samleid.frontend_action_not_supported"
      defaultMessage="SamleID frontend action not supported."
    />
  ),

  "samleid.identity_not_matching": (
    <FormattedMessage
      id="samleid.identity_not_matching"
      defaultMessage="The identity does not match the one verified for this eduID"
    />
  ),

  "samleid.identity_already_verified": (
    <FormattedMessage id="samleid.identity_already_verified" defaultMessage="You have already verified your identity" />
  ),

  "samleid.identity_verify_success": <FormattedMessage id="samleid.identity_verify_success" defaultMessage="Success" />,

  "samleid.no_redirect_url": (
    <FormattedMessage id="samleid.no_redirect_url" defaultMessage="MFA authentication is missing a redirect URL" />
  ),

  "samleid.credential_not_found": (
    <FormattedMessage
      id="samleid.credential_not_found"
      defaultMessage={`The passkey or security key was not recognized. Please try logging in with your password instead.`}
    />
  ),

  "samleid.attribute_missing": (
    <FormattedMessage id="samleid.attribute_missing" defaultMessage="SamleID attribute is missing" />
  ),

  "samleid.method_not_available": (
    <FormattedMessage id="samleid.method_not_available" defaultMessage="SamleID method is not available" />
  ),

  "samleid.not_found": <FormattedMessage id="samleid.not_found" defaultMessage="SamleID not found" />,

  "samleid.mfa_authn_success": <FormattedMessage id="samleid.mfa_authn_success" defaultMessage="Success" />,

  "samleid.credential_verify_success": (
    <FormattedMessage id="samleid.credential_verify_success" defaultMessage="Success" />
  ),

  "samleid.credential_verification_not_allowed": (
    <FormattedMessage
      id="samleid.credential_verification_not_allowed"
      defaultMessage="SamleID credential verification not allowed."
    />
  ),
};
