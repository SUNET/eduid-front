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
  "emails.placeholder": (
    <FormattedMessage
      id="emails.confirm_email_placeholder"
      defaultMessage={`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`}
      description="Placeholder for email text input"
    />
  ),
  "emails.confirm_help_text": (
    <FormattedMessage
      id="emails.confirm_help_text"
      defaultMessage={"Code is formatted as five groups of characters and numbers, separated by hyphens"}
      description="Help text for email confirmation code"
    />
  ),
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
  "mobile.placeholder": (
    <FormattedMessage
      id="mobile.confirm_mobile_placeholder"
      defaultMessage={`Phone confirmation code`}
      description="Placeholder for phone text input"
    />
  ),
  "security.placeholder": (
    <FormattedMessage
      id="security.confirm_security_placeholder"
      defaultMessage={`Describe your security key`}
      description="Placeholder for security key text input"
    />
  ),
  "security.help_text": (
    <FormattedMessage
      id="security.help_text"
      defaultMessage={`max 50 characters`}
      description="Help text for security key max length"
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
  "cm.resend_code": (
    <FormattedMessage
      id="cm.resend_code"
      defaultMessage={`Send a new confirmation code`}
      description="Lost code problem solution"
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
  "letter.placeholder": (
    <FormattedMessage
      id="letter.placeholder"
      defaultMessage={`Letter confirmation code`}
      description="Placeholder for letter proofing text input"
    />
  ),
  "pd.display_name": <FormattedMessage id="pd.display_name" defaultMessage={`Display name`} />,
  "pd.language": <FormattedMessage id="pd.language" defaultMessage={`Language`} />,
  "phones.input_placeholder": <FormattedMessage id="phones.input_placeholder" defaultMessage={`Phone number`} />,
};
