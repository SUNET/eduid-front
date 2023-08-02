import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "resetpw.user-not-found": (
    <FormattedMessage
      id="resetpw.user-not-found"
      defaultMessage="If the address is registered, a message with instructions to reset the password has been sent."
    />
  ),

  "resetpw.invalid_user": (
    <FormattedMessage id="resetpw.invalid_user" defaultMessage={"User has not completed signup"} />
  ),

  "resetpw.invalid_session": (
    <FormattedMessage id="resetpw.invalid_session" defaultMessage={"Invalid session, please try again"} />
  ),

  "resetpw.email-send-failure": (
    <FormattedMessage id="resetpw.email-send-failure" defaultMessage={"Error sending mail, please try again"} />
  ),

  "resetpw.reset-pw-initialized": (
    <FormattedMessage
      id="resetpw.reset-pw-initialized"
      defaultMessage={`Reset password link has been sent to your email.`}
    />
  ),

  "resetpw.email-throttled": (
    <FormattedMessage
      id="resetpw.email-throttled"
      defaultMessage={`Reset password link already sent please try again later`}
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
      defaultMessage={`Password reset link has expired. Please send link again.`}
    />
  ),

  "resetpw.sms-throttled": (
    <FormattedMessage
      id="resetpw.sms-throttled"
      defaultMessage={`You have recently been sent a code. Please wait at least 5 minutes to request a new one.`}
    />
  ),

  "resetpw.send-sms-failed": <FormattedMessage id="resetpw.send-sms-failed" defaultMessage={`Failed to send code`} />,

  "resetpw.expired-phone-code": (
    <FormattedMessage
      id="resetpw.expired-phone-code"
      defaultMessage={`The code is no longer valid. Request a new code using the button below.`}
    />
  ),

  "resetpw.phone-code-unknown": (
    <FormattedMessage id="resetpw.phone-code-unknown" defaultMessage={`Incorrect code. `} />
  ),

  "resetpw.phone-invalid": <FormattedMessage id="resetpw.phone-invalid" defaultMessage={`Invalid phone number.`} />,

  "resetpw.pw-reset-fail": (
    <FormattedMessage id="resetpw.pw-reset-fail" defaultMessage={`Reset password failed, please try again `} />
  ),

  "resetpw.fido-token-fail": (
    <FormattedMessage
      id="resetpw.fido-token-fail"
      defaultMessage={`There was a problem using your security key for resetting password`}
    />
  ),

  "resetpw.external-mfa-fail": (
    <FormattedMessage id="resetpw.external-mfa-fail" defaultMessage={`External MFA failed.`} />
  ),
};
