import React from "react";
import { FormattedMessage } from "react-intl";

export const email = {
 

  "Not a valid email address.": (
    <FormattedMessage
      id="Not a valid email address."
      defaultMessage={`Not a valid email address.`}
    />
  ),

  "email.sign-up-email": (
    <FormattedMessage
      id="email.sign-up-email"
      defaultMessage={`Register for eduID`}
    />
  ),

  "email.invalid_email": (
    <FormattedMessage
      id="email.invalid_email"
      defaultMessage={`The entered email is invalid`}
    />
  )
};
