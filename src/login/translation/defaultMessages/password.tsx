import { FormattedMessage } from "react-intl";

export const changePassword = {
  /* ----- /chpass ChangePasswordForm ------- */

  "chpass.old_password": <FormattedMessage id="chpass.old_password" defaultMessage={`Current password`} />,

  "chpass.suggested_password": (
    <FormattedMessage id="chpass.suggested_password" defaultMessage={`Suggested password`} />
  ),

  "chpass.form_custom_password": (
    <FormattedMessage id="chpass.form_custom_password" defaultMessage={`Enter new password`} />
  ),

  "chpass.form_custom_password_repeat": (
    <FormattedMessage id="chpass.form_custom_password_repeat" defaultMessage={`Repeat new password`} />
  ),

  "chpass.no_old_pw": <FormattedMessage id="chpass.no_old_pw" defaultMessage={`Please enter your old password`} />,

  "chpass.no_reauthn": (
    <FormattedMessage id="chpass.no_reauthn" defaultMessage={`You must re-authenticate to change your password`} />
  ),

  "chpass.stale_reauthn": (
    <FormattedMessage
      id="chpass.stale_reauthn"
      defaultMessage={`Stale re-authentication. Please re-initiate the process.`}
    />
  ),

  "chpass.stale_authn_info": (
    <FormattedMessage
      id="chpass.stale_authn_info"
      defaultMessage={`Stale re-authentication. Please re-initiate the process.`}
    />
  ),

  "chpass.password-changed": (
    <FormattedMessage id="chpass.password-changed" defaultMessage={`Your password has been changed`} />
  ),

  "chpass.different-repeat": (
    <FormattedMessage id="chpass.different-repeat" defaultMessage={`The two passwords are different`} />
  ),

  "chpass.unable-to-verify-old-password": (
    <FormattedMessage
      id="chpass.unable-to-verify-old-password"
      defaultMessage={`There were problems trying to verify your old credentials. If you are certain that they are correct, please contact the administrator`}
    />
  ),

  "chpass.low-password-entropy": (
    <FormattedMessage id="chpass.low-password-entropy" defaultMessage={`Please provide a stronger password`} />
  ),

  // password strength

  "pwfield.terrible": <FormattedMessage id="pwfield.terrible" defaultMessage={`Extremely weak password`} />,

  "pwfield.bad": <FormattedMessage id="pwfield.bad" defaultMessage={`Very weak password`} />,

  "pwfield.weak": <FormattedMessage id="pwfield.weak" defaultMessage={`Weak password`} />,

  "pwfield.good": <FormattedMessage id="pwfield.good" defaultMessage={`Fairly strong password`} />,

  "pwfield.strong": <FormattedMessage id="pwfield.strong" defaultMessage={`Strong password`} />,

  "pwfield.repeat_different": (
    <FormattedMessage
      id="pwfield.repeat_different"
      defaultMessage={`The repeated password is different from the first`}
    />
  ),

  // password in two factor table, but think this is only security keys now
  "security.password_credential_type": (
    <FormattedMessage id="security.password_credential_type" defaultMessage={`Password`} />
  ),
};

export const resetPassword = {
  "resetpw.user-not-found": (
    <FormattedMessage
      id="resetpw.user-not-found"
      defaultMessage={"User does not exist, please check your email address"}
    />
  ),
  "resetpw.invalid_user": (
    <FormattedMessage id="resetpw.invalid_user" defaultMessage={"User has not completed signup"} />
  ),
  "resetpw.invalid_session": (
    <FormattedMessage id="resetpw.invalid_session" defaultMessage={"Invalid session, please try again"} />
  ),
  "resetpw.email-send-failure": (
    <FormattedMessage id="resetpw.email-send-failure" defaultMessage={"Error sending mail, please try again"} />
  ),
  "resetpw.return-login": <FormattedMessage id="resetpw.return-login" defaultMessage={"return to Login"} />,
  "resetpw.reset-pw-initialized": (
    <FormattedMessage
      id="resetpw.reset-pw-initialized"
      defaultMessage={`Reset password link has been sent to your email.`}
    />
  ),
  "resetpw.email-throttled": (
    <FormattedMessage
      id="resetpw.email-throttled"
      defaultMessage={`Reset password link already sent please try again later`}
    />
  ),
  "resetpw.extra-security_heading": (
    <FormattedMessage id="resetpw.extra-security_heading" defaultMessage={`Select an extra security option`} />
  ),
  "resetpw.extra-security_description": (
    <FormattedMessage
      id="resetpw.extra-security_description"
      defaultMessage={`A password reset using an extra security option will keep your account confirmed.`}
    />
  ),
  "resetpw.use_extra_security_key": (
    <FormattedMessage id="resetpw.use_extra_security_key" defaultMessage={`Use your security key`} />
  ),
  "resetpw.without_extra_security_heading": (
    <FormattedMessage
      id="resetpw.without_extra_security_heading"
      defaultMessage={`Continue without extra security option`}
    />
  ),
  "resetpw.without_extra_security": (
    <FormattedMessage
      id="resetpw.without_extra_security"
      defaultMessage={`Your account will require confirmation after the password has been reset.`}
    />
  ),
  "resetpw.continue_reset_password": (
    <FormattedMessage id="resetpw.continue_reset_password" defaultMessage={`Continue reset password`} />
  ),
  "resetpw.state-not-found": (
    <FormattedMessage
      id="resetpw.state-not-found"
      defaultMessage={`Could not continue the reset password process. Please try again `}
    />
  ),
  "resetpw.expired-email-code": (
    <FormattedMessage
      id="resetpw.expired-email-code"
      defaultMessage={`Password reset link has expired. Please send link again.`}
    />
  ),
  "resetpw.set-new-password-heading": (
    <FormattedMessage id="resetpw.set-new-password-heading" defaultMessage={`Set your new password`} />
  ),

  "resetpw.set-new-password-description": (
    <FormattedMessage
      id="resetpw.set-new-password-description"
      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy the password in to the Repeat new password field and click Accept Password.`}
    />
  ),

  "resetpw.set-new-password-success": (
    <FormattedMessage id="resetpw.set-new-password-success" defaultMessage={`Password has been updated.`} />
  ),

  "mfa.reset-password-tapit": (
    <FormattedMessage
      id="mfa.reset-password-tapit"
      defaultMessage={`Use your security key to reset password. If it has a button, tap it.`}
    />
  ),

  "resetpw.sms-throttled": (
    <FormattedMessage
      id="resetpw.sms-throttled"
      defaultMessage={`You have recently been sent a verification code. Please wait at least 5 minutes to request a new one.`}
    />
  ),

  "resetpw.send-sms-success": (
    <FormattedMessage
      id="resetpw.send-sms-success"
      defaultMessage={`One time verification code has been sent to your phone.`}
    />
  ),

  "resetpw.send-sms-failed": (
    <FormattedMessage id="resetpw.send-sms-failed" defaultMessage={`Failed to send phone code`} />
  ),

  "resetpw.expired-phone-code": (
    <FormattedMessage
      id="resetpw.expired-phone-code"
      defaultMessage={`The code is no longer valid. Request a new code using the button below.`}
    />
  ),
  "resetpw.received-sms": <FormattedMessage id="resetpw.received-sms" defaultMessage={`Already received sms? `} />,
  "resetpw.enter-code": <FormattedMessage id="resetpw.enter-code" defaultMessage={`enter code`} />,
  "resetpw.accept-password": <FormattedMessage id="resetpw.accept-password" defaultMessage={`accept password`} />,
  "resetpw.go-to-eduid": <FormattedMessage id="resetpw.go-to-eduid" defaultMessage={`Go to eduID`} />,
  "resetpw.new-password": <FormattedMessage id="resetpw.new-password" defaultMessage={`New password`} />,
  "resetpw.phone-code-unknown": (
    <FormattedMessage id="resetpw.phone-code-unknown" defaultMessage={`Incorrect phone code. `} />
  ),
  "resetpw.phone-invalid": <FormattedMessage id="resetpw.phone-invalid" defaultMessage={`Invalid phone number.`} />,
  "resetpw.pw-reset-fail": (
    <FormattedMessage id="resetpw.pw-reset-fail" defaultMessage={`Reset password failed, please try again `} />
  ),
  "resetpw.fido-token-fail": (
    <FormattedMessage
      id="resetpw.fido-token-fail"
      defaultMessage={`There was a problem using your security key for resetting password`}
    />
  ),
  "resetpw.external-mfa-fail": (
    <FormattedMessage id="resetpw.external-mfa-fail" defaultMessage={`External MFA failed.`} />
  ),
  "resetpw.go-back": <FormattedMessage id="resetpw.go-back" defaultMessage={`go back`} />,
};
