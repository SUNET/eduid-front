import React from "react";
import { FormattedMessage } from "react-intl";

export const login = {
  // --- USERNAME & PASSWORD --- //
  "login.usernamePw.password-input": (
    <FormattedMessage id="login.usernamePw.password-input" defaultMessage={`Password`} />
  ),
  "login.usernamePw.submit-button-idle": (
    <FormattedMessage id="login.usernamePw.submit-button-idle" defaultMessage={`Log in`} />
  ),
  "login.usernamePw.submit-button-busy": (
    <FormattedMessage id="login.usernamePw.submit-button-busy" defaultMessage={`Logging in`} />
  ),
  "login.usernamePw.reset-password-link": (
    <FormattedMessage id="login.usernamePw.reset-password-link" defaultMessage={`Forgot your password?`} />
  ),
  "login.usernamePw.register-prompt": (
    <FormattedMessage id="login.usernamePw.register-prompt" defaultMessage={`Don't have eduID?`} />
  ),
  "login.usernamePw.register-link": (
    <FormattedMessage id="login.usernamePw.register-link" defaultMessage={`Register here.`} />
  ),

  // --- MFA --- //
  "login.mfa.h2-heading": (
    <FormattedMessage id="login.mfa.h2-heading" defaultMessage={`Log in: Extra level of security`} />
  ),
  "login.mfa.paragraph": (
    <FormattedMessage
      id="login.mfa.paragraph"
      defaultMessage={`You need to choose a second method to authenticate yourself. This helps guarantee that only you can access your eduID.`}
    />
  ),
  // security key
  "login.mfa.primary-option.title": (
    <FormattedMessage id="login.mfa.primary-option.title" defaultMessage={`Security key`} />
  ),
  "login.mfa.primary-option.button": (
    <FormattedMessage id="login.mfa.primary-option.button" defaultMessage={`Use security key`} />
  ),
  // freja eid+
  "login.mfa.secondary-option.title": (
    <FormattedMessage id="login.mfa.secondary-option.title" defaultMessage={`Freja eID+`} />
  ),
  "login.mfa.secondary-option.button": (
    <FormattedMessage
      id="login.mfa.secondary-option.button"
      defaultMessage={`Use my {freja_eidplus_verbatim}`}
      values={{ freja_eidplus_verbatim: <span className="verbatim">Freja&nbsp;eID+</span> }}
    />
  ),
  "login.mfa.primary-option.hint": (
    <FormattedMessage
      id="login.mfa.primary-option.hint"
      defaultMessage={`If your security key has a button, don’t forget to tap it.`}
    />
  ),
};
