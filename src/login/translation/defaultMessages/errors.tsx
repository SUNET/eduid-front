import { FormattedMessage } from "react-intl";

export const generalErrors = {
  // non-error errors?
  "unexpected-success": <FormattedMessage id="unexpected-success" defaultMessage={`Success`} />,

  // general errors
  out_of_sync: (
    <FormattedMessage id="out_of_sync" defaultMessage={`User data is out of sync. Reload page to re-sync.`} />
  ),

  required: <FormattedMessage id="required" defaultMessage={`*Field cannot be empty`} />,

  "value not changed": <FormattedMessage id="value not changed" defaultMessage={`The value is not changed`} />,

  "user-out-of-sync": (
    <FormattedMessage id="user-out-of-sync" defaultMessage={`User data is out of sync. Reload page to re-sync.`} />
  ),

  "Missing error message": <FormattedMessage id="Missing error message" defaultMessage={`Missing error message`} />,

  "Temporary technical problems": (
    <FormattedMessage
      id="Temporary technical problems"
      defaultMessage={`Temporary technical problems, please try again later`}
    />
  ),

  "unexpected-problem": (
    <FormattedMessage
      id="unexpected-problem"
      defaultMessage={`There was an unexpected problem servicing your request, please try again or contact the site administrators`}
    />
  ),

  "code.unknown-code": <FormattedMessage id="code.unknown-code" defaultMessage={`Unknown code`} />,

  // system errors
  error_navet_task: <FormattedMessage id="error_navet_task" defaultMessage={`Communication problem with Navet`} />,

  error_lookup_mobile_task: (
    <FormattedMessage
      id="error_lookup_mobile_task"
      defaultMessage={`Your phone number could not be found in the registry. Please try another method.`}
    />
  ),

  "Error: Gateway Time-out": (
    <FormattedMessage
      id="Error: Gateway Time-out"
      defaultMessage={`The remote service is taking too long to respond, please try again`}
    />
  ),

  "No connection to authorization endpoint": (
    <FormattedMessage
      id="No connection to authorization endpoint"
      defaultMessage={`No connection to authorization endpoint, please try again later`}
    />
  ),

  "CSRF failed to validate": (
    <FormattedMessage id="CSRF failed to validate" defaultMessage={`CSRF failed to validate, please reload the page`} />
  ),

  "csrf.try-again": (
    <FormattedMessage
      id="csrf.try-again"
      defaultMessage={`There was a problem with your submission, please try again`}
    />
  ),

  "Error: NOT FOUND": (
    <FormattedMessage
      id="Error: NOT FOUND"
      defaultMessage={`There was an error (404) servicing your request. The administrator has been alerted. Please try again later.`}
    />
  ),

  "Error: Internal Server Error": (
    <FormattedMessage
      id="Error: Internal Server Error"
      defaultMessage={`There was an error (500) servicing your request. The administrator has been alerted. Please try again later.`}
    />
  ),

  "Error: Service Unavailable": (
    <FormattedMessage
      id="Error: Service Unavailable"
      defaultMessage={`Service Unavailable. Check your internet connection.`}
    />
  ),

  // user errors
  error_in_form: <FormattedMessage id="error_in_form" defaultMessage={`Check the form below for errors.`} />,

  // user errors
  "nin needs to be formatted as 18|19|20yymmddxxxx": (
    <FormattedMessage
      id="nin needs to be formatted as 18|19|20yymmddxxxx"
      defaultMessage={`National identity number needs to be in the form of yyyymmddxxxx`}
    />
  ),

  "Missing data for required field.": (
    <FormattedMessage id="Missing data for required field." defaultMessage={`Missing data for required field`} />
  ),

  "Not a valid email address.": (
    <FormattedMessage id="Not a valid email address." defaultMessage={`Not a valid email address.`} />
  ),

  "email.invalid_email": <FormattedMessage id="email.invalid_email" defaultMessage={`The entered email is invalid`} />,
};

export const specificErrors = {
  // login errors
  "login.wrong_credentials": (
    <FormattedMessage id="login.wrong_credentials" defaultMessage={`The email address or password was incorrect.`} />
  ),
  "eidas.reauthn_expired": (
    <FormattedMessage id="eidas.reauthn_expired" defaultMessage={`Authentication has expired. Please try again.`} />
  ),
  "login.mfa_auth_failure": (
    <FormattedMessage
      id="login.mfa_auth_failure"
      defaultMessage={`There was a problem with the authentication, please try again.`}
    />
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
  "eidas.authn_context_mismatch": (
    <FormattedMessage id="eidas.authn_context_mismatch" defaultMessage={`Wrong authentication context received`} />
  ),
  // OLD
  "eidas.nin_not_matching": (
    <FormattedMessage
      id="eidas.nin_not_matching"
      defaultMessage={`The identity does not match the one verified for this eduID`}
    />
  ),
  // NEW
  "eidas.identity_not_matching": (
    <FormattedMessage
      id="eidas.identity_not_matching"
      defaultMessage={`The identity does not match the one verified for this eduID`}
    />
  ),

  //freja errors
  "eidas.error_missing_nin": (
    <FormattedMessage
      id="eidas.error_missing_nin"
      defaultMessage={`Please add a national identity number and try again`}
    />
  ),

  "eidas.error_unknown_error": (
    <FormattedMessage
      id="eidas.error_unknown_error"
      defaultMessage={`Temporary technical difficulties, please try again later`}
    />
  ),

  // orcid errors
  "oc.error_missing_nin": (
    <FormattedMessage
      id="oc.error_missing_nin"
      defaultMessage={`Please add a national identity number and try again`}
    />
  ),

  "oc.error_unknown_error": (
    <FormattedMessage
      id="oc.error_unknown_error"
      defaultMessage={`Temporary technical difficulties, please try again later`}
    />
  ),
  // orcid + freja errors
  "ocf.error_missing_nin": (
    <FormattedMessage
      id="ocf.error_missing_nin"
      defaultMessage={`Please add a national identity number and try again`}
    />
  ),

  "ocf.error_unknown_error": (
    <FormattedMessage
      id="ocf.error_unknown_error"
      defaultMessage={`Temporary technical difficulties, please try again later`}
    />
  ),
  // mfa errors

  "mfa.no-webauthn-support": (
    <FormattedMessage id="mfa.no-webauthn-support" defaultMessage={`No support for security keys`} />
  ),

  "mfa.no-webauthn-support-text": (
    <FormattedMessage
      id="mfa.no-webauthn-support-text"
      defaultMessage={`You have registered a security key for authentication, but this browser does not support them. Please use another browser to use your security keys.`}
    />
  ),

  "mfa.freja-eid": <FormattedMessage id="mfa.freja-eid" defaultMessage={`Use Freja eID instead`} />,

  "mfa.error-getting-token": (
    <FormattedMessage id="mfa.error-getting-token" defaultMessage={`There was a problem using your security key`} />
  ),

  "mfa.edge-no-u2f": (
    <FormattedMessage
      id="mfa.edge-no-u2f"
      defaultMessage={`There is a problem with the Edge browser and U2F security keys. Please try with Firefox or Chrome.`}
    />
  ),

  // email errors
  mail_duplicated: <FormattedMessage id="mail_duplicated" defaultMessage={`Added email is duplicated`} />,
};
