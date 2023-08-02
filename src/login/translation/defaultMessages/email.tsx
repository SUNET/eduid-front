import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "emails.code_invalid": (
    <FormattedMessage
      id="emails.code_invalid"
      defaultMessage={`The code is invalid, please try again or request a new code`}
    />
  ),

  "emails.code_invalid_or_expired": (
    <FormattedMessage
      id="emails.code_invalid_or_expired"
      defaultMessage={`The code is invalid or has expired, please try again or request a new code`}
    />
  ),

  "emails.get-success": (
    <FormattedMessage id="emails.get-success" defaultMessage={`Successfully retrieved Email addresses`} />
  ),

  "emails.save-success": <FormattedMessage id="emails.save-success" defaultMessage={`The email address was saved`} />,

  "emails.unconfirmed_address_not_primary": (
    <FormattedMessage
      id="emails.unconfirmed_address_not_primary"
      defaultMessage={`You need to confirm and email address before it can be made primary`}
    />
  ),

  "emails.primary-success": (
    <FormattedMessage id="emails.primary-success" defaultMessage={`The primary email address was updated `} />
  ),

  "emails.verification-success": (
    <FormattedMessage id="emails.verification-success" defaultMessage={`Successfully verified email address`} />
  ),

  "emails.cannot_remove_unique": (
    <FormattedMessage id="emails.cannot_remove_unique" defaultMessage={`You must have at least one email address`} />
  ),

  "emails.cannot_remove_unique_verified": (
    <FormattedMessage
      id="emails.cannot_remove_unique_verified"
      defaultMessage={`You must have at least one verified email address`}
    />
  ),

  "emails.removal-success": (
    <FormattedMessage id="emails.removal-success" defaultMessage={`Successfully removed email address`} />
  ),

  "emails.code-sent": <FormattedMessage id="emails.code-sent" defaultMessage={`Successfully sent a code`} />,

  "emails.missing": <FormattedMessage id="emails.missing" defaultMessage={`You must provide an email address`} />,

  "emails.unknown_email": (
    <FormattedMessage
      id="emails.unknown_email"
      defaultMessage={`We have no record of the email address you provided`}
    />
  ),
};
