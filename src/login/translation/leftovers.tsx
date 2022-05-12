import React from "react";
import { FormattedMessage } from "react-intl";

export const leftoverMessages = {
  "placeholder.password": (
    <FormattedMessage
      id="placeholder.password"
      defaultMessage={`enter password`}
      description="placeholder text for password input"
    />
  ),
  "pd.choose-language": <FormattedMessage id="pd.choose-language" defaultMessage={`Choose language`} />,
  "confirmation.code_invalid_format": (
    <FormattedMessage
      id="confirmation.code_invalid_format"
      defaultMessage={`Invalid confirmation code`}
      description="error text for invalid confirmation code"
    />
  ),
  "security.description_invalid_format": (
    <FormattedMessage
      id="security.description_invalid_format"
      defaultMessage={`The description is too long`}
      description="Error message for max length"
    />
  ),
  "register.toLogin": (
    <FormattedMessage
      id="register.toLogin"
      defaultMessage={`If you already have eduID you can log in`}
      description="Signup instructions"
    />
  ),
  "text.link": (
    <FormattedMessage id="text.link" defaultMessage={`here.`} description="Placeholder for phone text input" />
  ),
  "chpass.help-text-newpass-label": (
    <FormattedMessage
      id="chpass.help-text-newpass-label"
      defaultMessage={`Tip: Choose a strong password`}
      description="help text for custom password label"
    />
  ),
  "cm.lost_code": (
    <FormattedMessage
      id="cm.lost_code"
      defaultMessage={`Is the code not working?`}
      description="Lost code problem description"
    />
  ),
  "letter.lost_code": (
    <FormattedMessage
      id="letter.lost_code"
      defaultMessage={`When you click on the "Send code" link a letter with a verification code will be sent to your official post address.`}
      description="Text for letter proofing confirm dialog"
    />
  ),
  "letter.resend_code": (
    <FormattedMessage
      id="letter.resend_code"
      defaultMessage={`Send code`}
      description="Text for letter code resend button"
    />
  ),
  "pd.display_name": <FormattedMessage id="pd.display_name" defaultMessage={`Display name`} />,
  "pd.language": <FormattedMessage id="pd.language" defaultMessage={`Language`} />,
};
