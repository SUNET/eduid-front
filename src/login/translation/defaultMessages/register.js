import React from "react";
import { FormattedMessage } from "react-intl";

export const register = {
  "register.create-account": (
    <FormattedMessage id="register.create-account" defaultMessage={`Sign up with your email address to start.`} />
  ),

  // terms of use

  "tou.must-accept": (
    <FormattedMessage id="tou.must-accept" defaultMessage={`You must accept the new terms of use before continuing`} />
  ),

  "tou.not-tou": (
    <FormattedMessage
      id="tou.not-tou"
      defaultMessage={`There were problems retrieving the current ToU, please contact the site administrators.`}
    />
  ),

  // captcha
  "captcha.one-step-left": <FormattedMessage id="captcha.one-step-left" defaultMessage={`Only one more step left!`} />,

  // eduID links sent to email
  "created.confirm-registration": (
    <FormattedMessage id="created.confirm-registration" defaultMessage={`Confirm your email to log in to eduID.`} />
  ),

  "created.email-sent": (values) => (
    <FormattedMessage
      id="created.email-sent"
      defaultMessage={`Click the confirmation link sent to {email} to be able log in to eduID`}
      values={values}
    />
  ),

  // eduID (email) verified
  "created.back_to_signup": <FormattedMessage id="created.back_to_signup" defaultMessage={`Back to signup`} />,

  "signup.registering-new": (
    <FormattedMessage id="signup.registering-new" defaultMessage={`Email address successfully registered`} />
  ),

  // eduID registration error: email already in use
  "signup.registering-address-used": (
    <FormattedMessage
      id="signup.registering-address-used"
      defaultMessage={`The email address you entered is already in use`}
    />
  ),

  "finish.can-now-login": <FormattedMessage id="finish.can-now-login" defaultMessage={`You can now log in`} />,

  "finish.sites-accept": (
    <FormattedMessage
      id="finish.sites-accept"
      defaultMessage={`Your account is now ready for use with sites that accept`}
    />
  ),

  "finish.unconfirmed-identities": (
    <FormattedMessage id="finish.unconfirmed-identities" defaultMessage={`unconfirmed identities`} />
  ),

  "finish.finish": <FormattedMessage id="finish.finish" defaultMessage={`FINISH`} />,

  "finish.access-more": <FormattedMessage id="finish.access-more" defaultMessage={`Access more`} />,

  "finish.to-dashboard": (
    <FormattedMessage
      id="finish.to-dashboard"
      defaultMessage={`To get access to additional sites that require a confirmed identity, proceed to the dashboard.`}
    />
  ),

  "finish.confirm-identity": <FormattedMessage id="finish.confirm-identity" defaultMessage={`CONFIRM IDENTITY`} />,
};
