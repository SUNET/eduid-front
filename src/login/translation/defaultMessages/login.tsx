import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "login.mfa.h2-heading": (
    <FormattedMessage id="login.mfa.h2-heading" defaultMessage={`Log in: Extra level of security`} />
  ),

  "login.mfa.paragraph": (
    <FormattedMessage
      id="login.mfa.paragraph"
      defaultMessage={`You need to choose a second method to authenticate yourself. This helps guarantee that only you can access your eduID.`}
    />
  ),

  "login.wrong_credentials": (
    <FormattedMessage id="login.wrong_credentials" defaultMessage={`The email address or password was incorrect.`} />
  ),

  "login.not_implemented": (
    <FormattedMessage id="login.not_implemented" defaultMessage={`There was a problem, please try again.`} />
  ),

  "login.assurance_failure": (
    <FormattedMessage id="login.assurance_failure" defaultMessage={`An error occurred. Please try again later.`} />
  ),

  "login.assurance_not_possible": (
    <FormattedMessage
      id="login.assurance_not_possible"
      defaultMessage={`The service requires something that eduID cannot provide. Contact the service owner for help.`}
    />
  ),

  "login.bad_ref": <FormattedMessage id="login.bad_ref" defaultMessage="Not found" />,

  "login.state_not_found": <FormattedMessage id="login.state_not_found" defaultMessage="Not found" />,

  "login.no_sso_session": (
    <FormattedMessage id="login.no_sso_session" defaultMessage="Session not found. Please try again." />
  ),

  "login.wrong_user": (
    <FormattedMessage
      id="login.wrong_user"
      defaultMessage="Wrong user. You can't log in as this user in this context."
    />
  ),

  "login.credential_expired": (
    <FormattedMessage
      id="login.credential_expired"
      defaultMessage={`The credential has expired because it was not used in 18 months. Perform a password reset or log in using some other credential.`}
    />
  ),

  "login.general_failure": (
    <FormattedMessage id="login.general_failure" defaultMessage={`An error occurred. Please try again later.`} />
  ),

  "login.not_available": (
    <FormattedMessage id="login.not_available" defaultMessage={`An error occurred. Please try again later.`} />
  ),

  "login.swamid_mfa_required": (
    <FormattedMessage
      id="login.swamid_mfa_required"
      defaultMessage={`The service requires Person-Proofed multi-factor authentication (SWAMID MFA). Visit the eduID dashboard to add a verified Security Key.`}
    />
  ),

  "login.user_temporary_locked": (
    <FormattedMessage
      id="login.user_temporary_locked"
      defaultMessage={`This account has reached the limit for incorrect logins and is temporarily disabled. Try again next calendar month.`}
    />
  ),

  "login.user_terminated": (
    <FormattedMessage
      id="login.user_terminated"
      defaultMessage={`This account has been terminated, but is still present. Perform a password reset to cancel termination. `}
    />
  ),
};
