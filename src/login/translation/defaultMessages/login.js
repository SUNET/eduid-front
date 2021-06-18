import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

export const login = {
  // --- USERNAME & PASSWORD --- //
  "login.usernamePw.h2-heading": (
    <FormattedMessage
      id="login.usernamePw.h2-heading"
      defaultMessage={`Log in`}
    />
  ),
  "login.usernamePw.password-input": (
    <FormattedMessage
      id="login.usernamePw.password-input"
      defaultMessage={`Password`}
    />
  ),
  "login.usernamePw.submit-button-idle": (
    <FormattedMessage
      id="login.usernamePw.submit-button-idle"
      defaultMessage={`Log in`}
    />
  ),
  "login.usernamePw.submit-button-busy": (
    <FormattedMessage
      id="login.usernamePw.submit-button-busy"
      defaultMessage={`Logging in`}
    />
  ),
  "login.usernamePw.reset-password-link": (
    <FormattedMessage
      id="login.usernamePw.reset-password-link"
      defaultMessage={`Forgot your password?`}
    />
  ),
  "login.usernamePw.register-prompt": (
    <FormattedMessage
      id="login.usernamePw.register-prompt"
      defaultMessage={`Don't have eduID?`}
    />
  ),
  "login.usernamePw.register-link": (
    <FormattedMessage
      id="login.usernamePw.register-link"
      defaultMessage={`Register here.`}
    />
  ),

  // --- TOU --- //
  "login.tou.h2-heading": (
    <FormattedMessage
      id="login.tou.h2-heading"
      defaultMessage={`Log in: Terms of use`}
    />
  ),
  "login.tou.paragraph": (
    <FormattedMessage
      id="login.tou.paragraph"
      defaultMessage={`We need an updated acceptance from you of the eduID terms of use.`}
    />
  ),
  "login.tou.button": (
    <FormattedMessage id="login.tou.button" defaultMessage={`Ì accept`} />
  ),

  // --- MFA --- //
  "login.mfa.h2-heading": (
    <FormattedMessage
      id="login.mfa.h2-heading"
      defaultMessage={`Log in: Extra level of security`}
    />
  ),
  "login.mfa.paragraph": (
    <FormattedMessage
      id="login.mfa.paragraph"
      defaultMessage={`You need to choose a second method to authenticate yourself. This helps guarantee that only you can access your eduID.`}
    />
  ),
  // security key
  "login.mfa.primary-choice.title": (
    <FormattedMessage
      id="login.mfa.primary-choice.title"
      defaultMessage={`Security key`}
    />
  ),
  "login.mfa.primary-choice.button": (
    <FormattedMessage
      id="login.mfa.primary-choice.button"
      defaultMessage={`Use my security key`}
    />
  ),
  // freja eid+
  "login.mfa.secondary-choice.title": (
    <FormattedMessage
      id="login.mfa.secondary-choice.title"
      defaultMessage={`Freja eID+`}
    />
  ),
  "login.mfa.secondary-choice.button": (
    <FormattedMessage
      id="login.mfa.secondary-choice.button"
      defaultMessage={`Use my freja eid+`}
    />
  ),

  // reset password
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
};