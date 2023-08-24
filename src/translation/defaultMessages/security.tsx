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

  "chpass.password-changed": (
    <FormattedMessage id="chpass.password-changed" defaultMessage={`Your password has been changed`} />
  ),
  "chpass.unable-to-verify-old-password": (
    <FormattedMessage
      id="chpass.unable-to-verify-old-password"
      defaultMessage={`There were problems trying to verify your old credentials. If you are certain that they are correct, please contact the administrator`}
    />
  ),

  "nins.successfully_added": (
    <FormattedMessage id="nins.successfully_added" defaultMessage={`Your id number was added.`} />
  ),
  "nins.success_removal": (
    <FormattedMessage id="nins.success_removal" defaultMessage={`Successfully removed national id number`} />
  ),

  "nins.verified_no_rm": (
    <FormattedMessage id="nins.verified_no_rm" defaultMessage={`You cannot remove your verified national id number`} />
  ),
  "cred.credential_type": <FormattedMessage id="cred.credential_type" defaultMessage={`Credential type.`} />,

  "security.user-update-throttled": (
    <FormattedMessage
      id="security.user-update-throttled"
      defaultMessage={`Too many attempts to update names have been made. Try again later.`}
    />
  ),

  "security.user-updated": (
    <FormattedMessage
      id="security.user-updated"
      defaultMessage={`First and last names are up-to-date with those registered in the Swedish Population Register.`}
    />
  ),

  "security.u2f_credential_type": <FormattedMessage id="security.u2f_credential_type" defaultMessage={`U2F token`} />,

  "security.webauthn.max_allowed_tokens": (
    <FormattedMessage
      id="security.webauthn.max_allowed_tokens"
      defaultMessage={`You are not allowed to register more security keys`}
    />
  ),

  "security.webauthn_register_success": (
    <FormattedMessage id="security.webauthn_register_success" defaultMessage={`Security key added`} />
  ),

  "security.webauthn-token-removed": (
    <FormattedMessage id="security.webauthn-token-removed" defaultMessage={`Security key has been removed.`} />
  ),

  "security.webauthn-missing-pdata": (
    <FormattedMessage
      id="security.webauthn-missing-pdata"
      defaultMessage={`You should add your name in Settings before adding a security key`}
    />
  ),

  "security.webauthn-token-notfound": (
    <FormattedMessage id="security.webauthn-token-notfound" defaultMessage={`Security token not found`} />
  ),

  "security.webauthn-noremove-last": (
    <FormattedMessage
      id="security.webauthn-noremove-last"
      defaultMessage={`You are not allowed to remove your only security key`}
    />
  ),

  "SecurityMsg.rm_webauthn": (
    <FormattedMessage id="SecurityMsg.rm_webauthn" defaultMessage={`Security key has been removed.`} />
  ),
};
