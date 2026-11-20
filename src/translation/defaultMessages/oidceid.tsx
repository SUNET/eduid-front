import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "oidceid.authn_context_mismatch": (
    <FormattedMessage id="oidceid.authn_context_mismatch" defaultMessage="Wrong authentication context received" />
  ),

  "oidceid.authn_instant_too_old": (
    <FormattedMessage id="oidceid.authn_instant_too_old" defaultMessage="Authentication instant is too old" />
  ),

  "oidceid.frontend_action_not_supported": (
    <FormattedMessage
      id="oidceid.frontend_action_not_supported"
      defaultMessage="SverigeID frontend action not supported."
    />
  ),

  "oidceid.identity_not_matching": (
    <FormattedMessage
      id="oidceid.identity_not_matching"
      defaultMessage="The identity does not match the one verified for this eduID"
    />
  ),

  "oidceid.identity_already_verified": (
    <FormattedMessage id="oidceid.identity_already_verified" defaultMessage="You have already verified your identity" />
  ),

  "oidceid.identity_verify_success": <FormattedMessage id="oidceid.identity_verify_success" defaultMessage="Success" />,

  "oidceid.no_redirect_url": (
    <FormattedMessage id="oidceid.no_redirect_url" defaultMessage="MFA authentication is missing a redirect URL" />
  ),

  "oidceid.credential_not_found": (
    <FormattedMessage
      id="oidceid.credential_not_found"
      defaultMessage={`The passkey or security key was not recognized. Please try logging in with your password instead.`}
    />
  ),

  "oidceid.attribute_missing": (
    <FormattedMessage id="oidceid.attribute_missing" defaultMessage="SverigeID attribute is missing" />
  ),

  "oidceid.method_not_available": (
    <FormattedMessage id="oidceid.method_not_available" defaultMessage="SverigeID method is not available" />
  ),

  "oidceid.not_found": <FormattedMessage id="oidceid.not_found" defaultMessage="SverigeID not found" />,

  "oidceid.mfa_authn_success": <FormattedMessage id="oidceid.mfa_authn_success" defaultMessage="Success" />,

  "oidceid.credential_verify_success": (
    <FormattedMessage id="oidceid.credential_verify_success" defaultMessage="Success" />
  ),

  "oidceid.credential_verification_not_allowed": (
    <FormattedMessage
      id="oidceid.credential_verification_not_allowed"
      defaultMessage="SverigeID credential verification not allowed."
    />
  ),
};
