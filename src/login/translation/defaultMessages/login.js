import React from "react";
import { FormattedMessage } from "react-intl";

export const login = {
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
      defaultMessage={`Reset password link not sent please try again later`}
    /> 
  ),
}