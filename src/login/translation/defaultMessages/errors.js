import React from "react";
import { FormattedMessage } from "react-intl";

export const generalErrors = {
  // non-error errors?
  "unexpected-success": (
    <FormattedMessage id="unexpected-success" defaultMessage={`Success`} />
  ),

  // general errors
  out_of_sync: (
    <FormattedMessage
      id="out_of_sync"
      defaultMessage={`User data is out of sync. Reload page to re-sync.`}
    />
  ),

  required: (
    <FormattedMessage id="required" defaultMessage={`Field cannot be empty`} />
  ),

  "only allow letters": (
    <FormattedMessage id="only allow letters" defaultMessage={`Name can only consist of letters`} />
  ),

  "value not changed": (
    <FormattedMessage id="value not changed" defaultMessage={`Input value is not updating`} />
  ),

  "user-out-of-sync": (
    <FormattedMessage
      id="user-out-of-sync"
      defaultMessage={`User data is out of sync. Reload page to re-sync.`}
    />
  ),

  "Missing error message": (
    <FormattedMessage
      id="Missing error message"
      defaultMessage={`Missing error message`}
    />
  ),

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

  "code.unknown-code": (
    <FormattedMessage
      id="code.unknown-code"
      defaultMessage={`Unknown verification code`}
    />
  ),

  // system errors
  error_navet_task: (
    <FormattedMessage
      id="error_navet_task"
      defaultMessage={`Communication problem with Navet`}
    />
  ),

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
    <FormattedMessage
      id="CSRF failed to validate"
      defaultMessage={`CSRF failed to validate, please reload the page`}
    />
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
  error_in_form: (
    <FormattedMessage
      id="error_in_form"
      defaultMessage={`Check the form below for errors.`}
    />
  ),

  "Missing data for required field.": (
    <FormattedMessage
      id="Missing data for required field."
      defaultMessage={`Missing data for required field`}
    />
  ),

  "Not a valid email address.": (
    <FormattedMessage
      id="Not a valid email address."
      defaultMessage={`Not a valid email address.`}
    />
  ),

  "email.invalid_email": (
    <FormattedMessage
      id="email.invalid_email"
      defaultMessage={`The entered email is invalid`}
    />
  )
};

export const specificErrors = {
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
    <FormattedMessage
      id="mfa.no-webauthn-support"
      defaultMessage={`No support for security keys`}
    />
  ),

  "mfa.no-webauthn-support-text": (
    <FormattedMessage
      id="mfa.no-webauthn-support-text"
      defaultMessage={`You have registered a security key for authentication, but this browser does not support them. Please use another browser to use your security keys.`}
    />
  ),

  "mfa.freja-eid": (
    <FormattedMessage
      id="mfa.freja-eid"
      defaultMessage={`Use Freja eID instead`}
    />
  ),

  "mfa.problems-heading": (
    <FormattedMessage id="mfa.problems-heading" defaultMessage={`Problems?`} />
  ),

  "mfa.error-getting-token": (
    <FormattedMessage
      id="mfa.error-getting-token"
      defaultMessage={`There was a problem using your security key`}
    />
  ),

  "mfa.edge-no-u2f": (
    <FormattedMessage
      id="mfa.edge-no-u2f"
      defaultMessage={`There is a problem with the Edge browser and U2F security keys. Please try with Firefox or Chrome.`}
    />
  ),

  "security.u2f_registration_error_unknown": (
    <FormattedMessage
      id="security.u2f_registration_error_unknown"
      defaultMessage={`U2F error: Unknown error`}
    />
  ),

  "security.u2f_registration_error_bad": (
    <FormattedMessage
      id="security.u2f_registration_error_bad"
      defaultMessage={`U2F error: Bad request`}
    />
  ),

  "security.u2f_registration_error_unsupported": (
    <FormattedMessage
      id="security.u2f_registration_error_unsupported"
      defaultMessage={`U2F error: Configuration unsupported`}
    />
  ),

  "security.u2f_registration_error_device": (
    <FormattedMessage
      id="security.u2f_registration_error_device"
      defaultMessage={`U2F error: Device ineligible`}
    />
  ),

  "security.u2f_registration_error_timeout": (
    <FormattedMessage
      id="security.u2f_registration_error_timeout"
      defaultMessage={`U2F error: Timeout`}
    />
  ),

  "security.u2f_registration_error_code": values => (
    <FormattedMessage
      id="security.u2f_registration_error_code"
      defaultMessage={`U2F failed with error code: {errorCode}`}
      values={values}
    />
  ),

  // captcha error
  "signup.recaptcha-not-verified": (
    <FormattedMessage
      id="signup.recaptcha-not-verified"
      defaultMessage={`There was a problem verifying that you are a human. Please try again`}
    />
  ),

  // email errors
  mail_duplicated: (
    <FormattedMessage
      id="mail_duplicated"
      defaultMessage={`Added email is duplicated`}
    />
  ),


};
