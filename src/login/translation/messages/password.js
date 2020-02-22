import React from "react";
import { FormattedMessage } from "react-intl";

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
      defaultMessage={`I want to change my password`}
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

  // links to forgot password and reset password
  "used.forgot-password": (
    <FormattedMessage
      id="used.forgot-password"
      defaultMessage={`Forgot your password?`}
    />
  ),

  "used.reset-password": (
    <FormattedMessage
      id="used.reset-password"
      defaultMessage={`Reset your password`}
    />
  ),

  // password in two factor table, but think this is only security keys now
  "security.password_credential_type": (
    <FormattedMessage
      id="security.password_credential_type"
      defaultMessage={`Password`}
    />
  ),
};

export const resetPassword = {};
