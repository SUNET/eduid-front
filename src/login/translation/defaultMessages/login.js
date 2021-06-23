import React from "react";
import { FormattedMessage } from "react-intl";

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
};
