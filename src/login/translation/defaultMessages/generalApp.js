import React from "react";
import { FormattedMessage } from "react-intl";

export const generalApp = {
  // header
  "header.signup": (
    <FormattedMessage id="header.signup" defaultMessage={`SIGN UP`} />
  ),

  "header.signin": (
    <FormattedMessage id="header.signin" defaultMessage={`Log in`} />
  ),

  // this is in the footer!
  "header.faq": <FormattedMessage id="header.faq" defaultMessage={`Help`} />,

  "header.logout": (
    <FormattedMessage id="header.logout" defaultMessage={`Logout`} />
  ),

  "main.welcome": (
    <FormattedMessage id="main.welcome" defaultMessage={`Welcome to eduID`} />
  ),

  "banner.tagline": (
    <FormattedMessage
      id="banner.tagline"
      defaultMessage={`eduID is easier and safer login.`}
    />
  ),

  // footer
  "main.copyright": (
    <FormattedMessage id="main.copyright" defaultMessage={` SUNET 2013-2019`} />
  ),

  "beta-link.to-stable": (
    <FormattedMessage
      id="beta-link.to-stable"
      defaultMessage={`The new eduID is under development, click here to go back to the stable version`}
    />
  ),

  "foot.change-version-tip": (
    <FormattedMessage
      id="foot.change-version-tip"
      defaultMessage={`This is an experimental version. If you experience any problem while using the app, you can switch to the old version.`}
    />
  ),

  // buttons
  button_save: <FormattedMessage id="button_save" defaultMessage={`Save`} />,

  button_add: <FormattedMessage id="button_add" defaultMessage={`Add`} />,

  // mfa messages
  "mfa.fake-authn": (
    <FormattedMessage
      id="mfa.fake-authn"
      defaultMessage={`Fake authn while testing`}
    />
  ),

  "mfa.two-factor-authn": (
    <FormattedMessage
      id="mfa.two-factor-authn"
      defaultMessage={`Two-factor authentication`}
    />
  ),

  "mfa.extra-security-enabled": (
    <FormattedMessage
      id="mfa.extra-security-enabled"
      defaultMessage={`Extra security enabled for this account`}
    />
  ),

  "mfa.login-tapit": (
    <FormattedMessage
      id="mfa.login-tapit"
      defaultMessage={`Use your security key to log in. If it has a button, tap it.`}
    />
  ),

  // sucess
  "actions.action-completed": (
    <FormattedMessage
      id="actions.action-completed"
      defaultMessage={`Success`}
    />
  ),

  // modal
  /* ----- ConfirmModal  ------- */

  "cm.ok": <FormattedMessage id="cm.ok" defaultMessage={`OK`} />,

  "cm.finish": <FormattedMessage id="cm.finish" defaultMessage={`FINISH`} />,

  "cm.cancel": <FormattedMessage id="cm.cancel" defaultMessage={`CANCEL`} />,

  "cm.accept": <FormattedMessage id="cm.accept" defaultMessage={`ACCEPT`} />,

  "cm.close": <FormattedMessage id="cm.close" defaultMessage={`CLOSE`} />,

  "cm.enter_code": (
    <FormattedMessage
      id="cm.enter_code"
      defaultMessage={`Confirmation code`}
    />
  ),

  // code still valid
  "still-valid-code": (
    <FormattedMessage
      id="still-valid-code"
      defaultMessage={`You have recently been sent a verification code. Please wait at least 5 minutes to request a new one.`}
    />
  ),

  // buttons in email/phone table
  "tl.primary": <FormattedMessage id="tl.primary" defaultMessage={`PRIMARY`} />,

  "tl.make_primary": (
    <FormattedMessage id="tl.make_primary" defaultMessage={`MAKE PRIMARY`} />
  ),

  "tl.pending": <FormattedMessage id="tl.pending" defaultMessage={`confirm`} />
};

// export const specificElements = {};
