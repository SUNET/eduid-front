import React from "react";
import { FormattedMessage } from "react-intl";

export const register = {
  "register.sub-heading": (
    <FormattedMessage
      id="register.sub-heading"
      defaultMessage={`Register your email address to create your eduID.`}
    />
  ),

  "register.paragraph": (
    <FormattedMessage
      id="register.paragraph"
      defaultMessage={`Get log in details to connect your eduID to your Swedish national identity number.`}
    />
  ),

  "register.create-account": (
    <FormattedMessage
      id="register.create-account"
      defaultMessage={`Sign up with your email address to start.`}
    />
  ),

  "email.sign-up-email": (
    <FormattedMessage
      id="email.sign-up-email"
      defaultMessage={`Create eduID`}
    />
  ),

  // terms of use
  "tou.header": (
    <FormattedMessage
      id="tou.header"
      defaultMessage={`General rules for eduID users`}
    />
  ),

  "tou.cancel": <FormattedMessage id="tou.cancel" defaultMessage={`Cancel`} />,

  "tou.accept": <FormattedMessage id="tou.accept" defaultMessage={`Accept`} />,

  "tou.must-accept": (
    <FormattedMessage
      id="tou.must-accept"
      defaultMessage={`You must accept the new terms of use before continuing`}
    />
  ),

  "tou.not-tou": (
    <FormattedMessage
      id="tou.not-tou"
      defaultMessage={`There were problems retrieving the current ToU, please contact the site administrators.`}
    />
  ),

  // captcha
  "captcha.one-step-left": (
    <FormattedMessage
      id="captcha.one-step-left"
      defaultMessage={`Only one more step left!`}
    />
  ),

  "captcha.verify-human": (
    <FormattedMessage
      id="captcha.verify-human"
      defaultMessage={`Confirm that you are a human.`}
    />
  ),

  "captcha.submit": (
    <FormattedMessage id="captcha.submit" defaultMessage={`Done`} />
  ),

  "captcha.cancel": (
    <FormattedMessage id="captcha.cancel" defaultMessage={`Cancel`} />
  ),

  // eduID links sent to email
  "created.confirm-registration": (
    <FormattedMessage
      id="created.confirm-registration"
      defaultMessage={`Confirm your email to log in to eduID.`}
    />
  ),

  "created.email-sent": (values) => (
    <FormattedMessage
      id="created.email-sent"
      defaultMessage={`Click the confirmation link sent to {email} to be able log in to eduID`}
      values={values}
    />
  ),

  // eduID created
  "created.account-created": (
    <FormattedMessage
      id="created.account-created"
      defaultMessage={`A link has been sent to your email address.`}
    />
  ),

  "created.email-label": (
    <FormattedMessage
      id="created.email-label"
      defaultMessage={`Complete registration by clicking the link sent to:`}
    />
  ),

  // eduID (email) verified
  "created.back_to_signup": (
    <FormattedMessage
      id="created.back_to_signup"
      defaultMessage={`Back to signup`}
    />
  ),

  "signup.registering-new": (
    <FormattedMessage
      id="signup.registering-new"
      defaultMessage={`Email address successfully registered`}
    />
  ),

  "signup.registering-input": (
    <FormattedMessage
      id="signup.registering-input"
      defaultMessage={`Email address`}
    />
  ),

  // eduID registration error: email already in use
  "signup.registering-address-used": (
    <FormattedMessage
      id="signup.registering-address-used"
      defaultMessage={`The email address you entered is already in use`}
    />
  ),

  "used.email-label": (
    <FormattedMessage
      id="used.email-label"
      defaultMessage={`If this is your eduID, you can reset your password to log back in.`}
    />
  ),

  "used.email-in-use": (values) => (
    <FormattedMessage
      id="used.email-in-use"
      defaultMessage={`An eduID is already using {email}`}
      values={values}
    />
  ),

  // eduID registration complete
  "finish.registration-complete": (
    <FormattedMessage
      id="finish.registration-complete"
      defaultMessage={`You have completed the registration for eduID.`}
    />
  ),

  "finish.registration-details": (
    <FormattedMessage
      id="finish.registration-details"
      defaultMessage={`These are your login details for eduID.`}
    />
  ),

  "finish.got-it": (
    <FormattedMessage id="finish.got-it" defaultMessage={`go to my eduid`} />
  ),

  "finish.can-now-login": (
    <FormattedMessage
      id="finish.can-now-login"
      defaultMessage={`You can now log in`}
    />
  ),

  "finish.sites-accept": (
    <FormattedMessage
      id="finish.sites-accept"
      defaultMessage={`Your account is now ready for use with sites that accept`}
    />
  ),

  "finish.unconfirmed-identities": (
    <FormattedMessage
      id="finish.unconfirmed-identities"
      defaultMessage={`unconfirmed identities`}
    />
  ),

  "finish.finish": (
    <FormattedMessage id="finish.finish" defaultMessage={`FINISH`} />
  ),

  "finish.access-more": (
    <FormattedMessage id="finish.access-more" defaultMessage={`Access more`} />
  ),

  "finish.to-dashboard": (
    <FormattedMessage
      id="finish.to-dashboard"
      defaultMessage={`To get access to additional sites that require a confirmed identity, proceed to the dashboard.`}
    />
  ),

  "finish.confirm-identity": (
    <FormattedMessage
      id="finish.confirm-identity"
      defaultMessage={`CONFIRM IDENTITY`}
    />
  ),
};
