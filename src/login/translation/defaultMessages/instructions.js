import React from "react";
import { FormattedMessage } from "react-intl";

export const generalInstructions = {
  // "main.unconfirmed": (
  //   <FormattedMessage id="main.unconfirmed" defaultMessage={`Unconfirmed`} />
  // ),

  // "main.confirmed": (
  //   <FormattedMessage id="main.confirmed" defaultMessage={`Confirmed`} />
  // ),

  faq_link: (
    <FormattedMessage
      id="faq_link"
      defaultMessage={`For more information see the `}
    />
  ),

  // link sent to email (resend link)
  "resend.link-sent": (
    <FormattedMessage
      id="resend.link-sent"
      defaultMessage={`A link has been sent to your email address.`}
    />
  ),

  "resend.email-label": (
    <FormattedMessage
      id="resend.email-label"
      defaultMessage={`Complete registration by clicking the link sent to:`}
    />
  ),

  "resend.button": (
    <FormattedMessage
      id="resend.button"
      defaultMessage={`Send a new confirmation link`}
    />
  ),

  "signup.verification-resent": (
    <FormattedMessage
      id="signup.verification-resent"
      defaultMessage={`Verification email resent`}
    />
  ),

  "signup.registering-resend-code": (
    <FormattedMessage
      id="signup.registering-resend-code"
      defaultMessage={`Verification email resent`}
    />
  ),

  // mfa instructions
  "mfa.try-again": (
    <FormattedMessage id="mfa.try-again" defaultMessage={`Try again`} />
  ),
  "mfa.login-tapit": (
    <FormattedMessage
      id="mfa.login-tapit"
      defaultMessage={`Use your security key to log in. If it has a button, tap it.`}
    />
  ),
  "mfa.two-factor-authn": (
    <FormattedMessage
      id="mfa.two-factor-authn"
      defaultMessage={`Use your security key to log in. If it has a button, tap it.`}
    />
  ),
  "mfa.extra-security-enabled": (
    <FormattedMessage
      id="mfa.extra-security-enabled"
      defaultMessage={`Use your security key to log in. If it has a button, tap it.`}
    />
  ),
};

export const specificInstructions = {};
