import { FormattedMessage } from "react-intl";

// Translations of messages from the signup backend
export const apiResponses = {
  "signup.registering-address-used": (
    <FormattedMessage
      id="signup.registering-address-used"
      defaultMessage={`The email address you entered is already registered.`}
    />
  ),

  "signup.recaptcha-not-verified": (
    <FormattedMessage
      id="signup.recaptcha-not-verified"
      defaultMessage={`There was a problem verifying that you are a human. Please try again`}
    />
  ),

  "signup.unknown-code": <FormattedMessage id="signup.unknown-code" defaultMessage={`Unknown code.`} />,

  "signup.already-verified": (
    <FormattedMessage id="signup.already-verified" defaultMessage={`You have already verified your account.`} />
  ),

  "signup.tou-not-accepted": (
    <FormattedMessage id="signup.tou-not-accepted" defaultMessage={`Terms of use is not accepted. `} />
  ),

  "signup.registering-new": (
    <FormattedMessage id="signup.registering-new" defaultMessage={`Email address successfully registered`} />
  ),

  "signup.email-verification-expired": (
    <FormattedMessage id="signup.email-verification-expired" defaultMessage={`Code expired. Please try again.`} />
  ),

  "signup.email-throttled": (
    <FormattedMessage
      id="signup.email-throttled"
      defaultMessage={`Too many attempts to create account have been made. Try again later.`}
    />
  ),

  "signup.email-verification-to-many-tries": (
    <FormattedMessage
      id="signup.email-verification-to-many-tries"
      defaultMessage={`Too many  invalid verification attempts. Please try again.`}
    />
  ),

  "signup.user-already-exists": (
    <FormattedMessage id="signup.user-already-exists" defaultMessage={`User already exists.`} />
  ),

  "signup.password-not-generated": (
    <FormattedMessage id="signup.password-not-generated" defaultMessage={`Password not generated. Please try again.`} />
  ),

  "signup.webauthn-not-registered": (
    <FormattedMessage id="signup.webauthn-not-registered" defaultMessage={`Webauthn not registered.`} />
  ),

  "signup.credential-not-added": (
    <FormattedMessage id="signup.credential-not-added" defaultMessage={`No credential added.`} />
  ),

  "signup.invite-not-found": <FormattedMessage id="signup.invite-not-found" defaultMessage={`Invitation not found.`} />,

  "signup.invite-already-completed": (
    <FormattedMessage id="signup.invite-already-completed" defaultMessage={`Invitation already completed.`} />
  ),

  //New messages for the new signup flow version 2022
  "signup.tou-not-completed": (
    <FormattedMessage id="signup.tou-not-completed" defaultMessage={`Terms of use has not been completed.`} />
  ),

  "signup.tou-wrong-version": (
    <FormattedMessage id="signup.tou-wrong-version" defaultMessage={`Incorrect Terms of use version.`} />
  ),

  "signup.email-address-used": (
    <FormattedMessage
      id="signup.email-address-used"
      defaultMessage={`The email address is already registered. If you've forgotten your password, go to the login page and reset it.`}
    />
  ),

  "signup.captcha-not-completed": (
    <FormattedMessage id="signup.captcha-not-completed" defaultMessage={`The captcha has not been completed.`} />
  ),

  "signup.captcha-failed": (
    <FormattedMessage
      id="signup.captcha-failed"
      defaultMessage={`There was a problem verifying that you are a human. 
        Please try again.`}
    />
  ),

  "signup.captcha-already-completed": (
    <FormattedMessage
      id="signup.captcha-already-completed"
      defaultMessage={`The captcha has already been completed.`}
    />
  ),

  "signup.captcha-not-requested": (
    <FormattedMessage id="signup.captcha-not-requested" defaultMessage={`The captcha has not been requested.`} />
  ),

  "signup.email-verification-not-complete": (
    <FormattedMessage
      id="signup.email-verification-not-complete"
      defaultMessage={`The email verification has not been completed.`}
    />
  ),

  "signup.email-verification-failed": (
    <FormattedMessage
      id="signup.email-verification-failed"
      defaultMessage={`The email verification failed. Please try again.`}
    />
  ),
};
