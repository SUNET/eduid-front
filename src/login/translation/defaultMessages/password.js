import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

export const changePassword = { 
  // help
  "chpass.help-text-general": (
    <FormattedMessage
      id="chpass.help-text-general"
      defaultMessage={`You can change your current password using this form. A strong password has been generated for you. You can accept the generated password by clicking "Change password" or you can opt to choose your own password using the checkbox.`}
    />
  ),

  /* ----- /chpass ChangePassword ------- */
  "chpass.main_title": (
    <FormattedMessage
      id="chpass.main_title"
      defaultMessage={`Change your current password`}
    />
  ),

  /* ----- /chpass ChangePasswordForm ------- */

  "chpass.old_password": (
    <FormattedMessage
      id="chpass.old_password"
      defaultMessage={`Current password`}
    />
  ),

  "chpass.suggested_password": (
    <FormattedMessage
      id="chpass.suggested_password"
      defaultMessage={`Suggested password`}
    />
  ),

  "chpass.button_custom_password": (
    <FormattedMessage
      id="chpass.button_custom_password"
      defaultMessage={`I don't want a suggested password`}
    />
  ),

  "chpass.form_custom_password": (
    <FormattedMessage
      id="chpass.form_custom_password"
      defaultMessage={`Enter new password`}
    />
  ),

  "chpass.form_custom_password_repeat": (
    <FormattedMessage
      id="chpass.form_custom_password_repeat"
      defaultMessage={`Repeat new password`}
    />
  ),

  "chpass.button_suggest_password": (
    <FormattedMessage
      id="chpass.button_suggest_password"
      defaultMessage={`Suggest a password for me`}
    />
  ),

  "chpass.button_save_password": (
    <FormattedMessage
      id="chpass.button_save_password"
      defaultMessage={`Save`}
    />
  ),

  "chpass.no_old_pw": (
    <FormattedMessage
      id="chpass.no_old_pw"
      defaultMessage={`Please enter your old password`}
    />
  ),

  "chpass.no_reauthn": (
    <FormattedMessage
      id="chpass.no_reauthn"
      defaultMessage={`You must re-authenticate to change your password`}
    />
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
    <FormattedMessage
      id="chpass.password-changed"
      defaultMessage={`Your password has been changed`}
    />
  ),

  "chpass.different-repeat": (
    <FormattedMessage
      id="chpass.different-repeat"
      defaultMessage={`The two passwords are different`}
    />
  ),

  "chpass.unable-to-verify-old-password": (
    <FormattedMessage
      id="chpass.unable-to-verify-old-password"
      defaultMessage={`There were problems trying to verify your old credentials. If you are certain that they are correct, please contact the administrator`}
    />
  ),

  "chpass.low-password-entropy": (
    <FormattedMessage
      id="chpass.low-password-entropy"
      defaultMessage={`Please provide a stronger password`}
    />
  ),

  // button and info in settings
  "settings.main_title": (
    <FormattedMessage
      id="settings.main_title"
      defaultMessage={`Change password`}
    />
  ),

  "settings.long_description": (
    <FormattedMessage
      id="settings.long_description"
      defaultMessage={`Click the link to change your eduID password.`}
    />
  ),
  "settings.change_password": (
    <FormattedMessage
      id="settings.change_password"
      defaultMessage={`Change password`}
    />
  ),

  "settings.confirm_title_chpass": (
    <FormattedMessage
      id="settings.confirm_title_chpass"
      defaultMessage={`For security reasons...`}
    />
  ),

  "settings.change_info": (
    <FormattedMessage
      id="settings.change_info"
      defaultMessage={`You will need to log in again to change your password.`}
    />
  ),

  // password stregth

  "pwfield.terrible": (
    <FormattedMessage
      id="pwfield.terrible"
      defaultMessage={`Extremely weak password`}
    />
  ),

  "pwfield.bad": (
    <FormattedMessage id="pwfield.bad" defaultMessage={`Very weak password`} />
  ),

  "pwfield.weak": (
    <FormattedMessage id="pwfield.weak" defaultMessage={`Weak password`} />
  ),

  "pwfield.good": (
    <FormattedMessage
      id="pwfield.good"
      defaultMessage={`Fairly strong password`}
    />
  ),

  "pwfield.strong": (
    <FormattedMessage id="pwfield.strong" defaultMessage={`Strong password`} />
  ),

  "pwfield.repeat_different": (
    <FormattedMessage
      id="pwfield.repeat_different"
      defaultMessage={`The repeated password is different from the first`}
    />
  ),

  // password in two factor table, but think this is only security keys now
  "security.password_credential_type": (
    <FormattedMessage
      id="security.password_credential_type"
      defaultMessage={`Password`}
    />
  ),

  // links to reset password from sign up
  "used.reset-password": (
    <FormattedMessage
      id="used.reset-password"
      defaultMessage={`Reset your password`}
    />
  ),
};

export const resetPassword = {
  "resetpw.heading-add-email": (
    <FormattedMessage
      id="resetpw.heading-add-email"
      defaultMessage={`Enter your email address registered to your account`}
    /> 
  ),
  "resetpw.send-link": (
    <FormattedMessage
      id="resetpw.send-link"
      defaultMessage={`send link to email`}
    />
  ),
  "resetpw.user-not-found": (
    <FormattedMessage
      id="resetpw.user-not-found"
      defaultMessage={"User does not exist, please check your email address"}
    />
  ),
  "resetpw.invalid_user": (
    <FormattedMessage
      id="resetpw.invalid_user"
      defaultMessage={"User has not completed signup"}
    />
  ),
  "resetpw.invalid_session": (
    <FormattedMessage
      id="resetpw.invalid_session"
      defaultMessage={"Invalid session, please try again"}
    />
  ),
  "resetpw.email-send-failure": (
    <FormattedMessage
      id="resetpw.email-send-failure"
      defaultMessage={"Error sending mail, please try again"}
    />
  ),
  "resetpw.return-login": (
    <FormattedMessage
      id="resetpw.return-login"
      defaultMessage={"return to Login"}
    />
  ),
  "resetpw.reset-pw-initialized": (
    <FormattedMessage
      id="resetpw.reset-pw-initialized"
      defaultMessage={`Reset password link has been sent`}
    /> 
  ),
  "resetpw.email-throttled": (
    <FormattedMessage
      id="resetpw.email-throttled"
      defaultMessage={`Reset password link already sent please try again later`}
    /> 
  ),
  "resetpw.check-email-link": (values) => (
    <FormattedHTMLMessage
      id="resetpw.check-email-link"
      defaultMessage={`Please check your email <b>{email}</b> to continue. \n          Link is valid for 2 hours.`}
      values={values}
    /> 
  ),
  "resetpw.resend-link": (
    <FormattedHTMLMessage
      id="resetpw.resend-link"
      defaultMessage={`If you didn’t receive the email? Check your junk email, \n or`}
    /> 
  ),
  "resetpw.resend-link-button": (
    <FormattedMessage
      id="resetpw.resend-link-button"
      defaultMessage={`resend link`}
    /> 
  ),
  "resetpw.extra-security_heading": (
    <FormattedMessage
      id="resetpw.extra-security_heading"
      defaultMessage={`Extra security`}
    />
  ),
  "resetpw.extra-security_description": (
    <FormattedMessage
      id="resetpw.extra-security_description"
      defaultMessage={`Prove that your are the owner of the account.`}
    />
  ),
  "resetpw.extra-phone_send_sms": (values) => (
    <FormattedHTMLMessage
      id="resetpw.extra-phone_send_sms"
      defaultMessage={`Send sms to {phone}`}
      values={values}
    /> 
  ),
  "resetpw.use_extra_security_key": (
    <FormattedMessage
      id="resetpw.use_extra_security_key"
      defaultMessage={`Use your security key`}
    /> 
  ),
  "resetpw.without_extra_security": (
    <FormattedHTMLMessage
      id="resetpw.without_extra_security"
      defaultMessage={`<b>For your security:</b> You will require to verify your eduID after resetting password without extra security  `}
    /> 
  ),
  "resetpw.continue_reset_password": (
    <FormattedMessage
      id="resetpw.continue_reset_password"
      defaultMessage={`Continue reset password`}
    /> 
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
      defaultMessage={`Email code has expired. Please try again.`}
    /> 
  ),
  "resetpw.set-new-password-heading": (
    <FormattedMessage
      id="resetpw.set-new-password-heading"
      defaultMessage={`Set your new password`}
    />
  ),

  "resetpw.set-new-password-description": (
    <FormattedMessage
      id="resetpw.set-new-password-description"
      defaultMessage={`A strong password has been generated for you. To proceed you will need to copy the password in to the Repeat new password field and click Accept Password.`}
    />
  ),

  "resetpw.set-new-password-success": (
    <FormattedMessage
      id="resetpw.set-new-password-success"
      defaultMessage={`Password reset has been updated`}
    />
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
      defaultMessage={`Phone code has been sent.`}
    />
  ),

  "resetpw.send-sms-failed": (
    <FormattedMessage
      id="resetpw.send-sms-failed"
      defaultMessage={`Failed to send phone code`}
    />
  ),

  "resetpw.expired-phone-code": (
    <FormattedMessage
      id="resetpw.expired-phone-code"
      defaultMessage={`Phone code has expired. Please try again.`}
    />
  ),
  "resetpw.received-sms": (
    <FormattedMessage
      id="resetpw.received-sms"
      defaultMessage={`Already received sms? `}
    />
  ),
  "resetpw.enter-code": (
    <FormattedMessage
      id="resetpw.enter-code"
      defaultMessage={`enter code`}
    />
  ),
  "resetpw.accept-password": (
    <FormattedMessage
      id="resetpw.accept-password"
      defaultMessage={`accept password`}
    />
  ),
  "resetpw.go-to-eduid": (
    <FormattedMessage
      id="resetpw.go-to-eduid"
      defaultMessage={`go to eduID`}
    />
  ),
  "resetpw.new-password": (
    <FormattedMessage
      id="resetpw.new-password"
      defaultMessage={`New password`}
    />
  ),
  "resetpw.phone-code-unknown": (
    <FormattedMessage
      id="resetpw.phone-code-unknown"
      defaultMessage={`Incorrect phone code. `}
    />
  ),
  "resetpw.phone-invalid": (
    <FormattedMessage
      id="resetpw.phone-invalid"
      defaultMessage={`Invalid phone number.`}
    />
  ),
  "resetpw.pw-reset-fail": (
    <FormattedMessage
      id="resetpw.pw-reset-fail"
      defaultMessage={`Reset password failed, please try again `}
    />
  ),
  "resetpw.fido-token-fail": (
    <FormattedMessage
      id="resetpw.fido-token-fail"
      defaultMessage={`There was a problem using your security key for resetting password`}
    />
  ),
};
