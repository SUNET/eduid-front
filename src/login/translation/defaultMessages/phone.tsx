import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "phone.captcha-not-completed": (
    <FormattedMessage id="phone.captcha-not-completed" defaultMessage={`Captcha not completed. Please try again.`} />
  ),

  "phone.captcha-failed": (
    <FormattedMessage id="phone.captcha-failed" defaultMessage={`Captcha failed. Please try again.`} />
  ),

  "phone.captcha-not-requested": (
    <FormattedMessage
      id="phone.captcha-not-requested"
      defaultMessage={`Captcha failed to initiate. Please try again. `}
    />
  ),

  "phone.phone_duplicated": <FormattedMessage id="phone_duplicated" defaultMessage={`Added number is duplicated`} />,

  "phone.phone_format": (
    <FormattedMessage
      id="phone_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 6-20 digits.`}
    />
  ),

  "phones.save-success": <FormattedMessage id="phones.save-success" defaultMessage={`The phone number was saved`} />,

  "phones.unconfirmed_number_not_primary": (
    <FormattedMessage
      id="phones.unconfirmed_number_not_primary"
      defaultMessage={`An unconfirmed phone number cannot be set as primary`}
    />
  ),

  "phones.primary-success": (
    <FormattedMessage id="phones.primary-success" defaultMessage={`The phone number was set as primary`} />
  ),

  "phones.unknown_phone": (
    <FormattedMessage id="phones.unknown_phone" defaultMessage={`We have no record of the phone number you provided`} />
  ),

  "phones.code_invalid_or_expired": (
    <FormattedMessage
      id="phones.code_invalid_or_expired"
      defaultMessage={`The code is invalid or it has expired, please try again or request a new code`}
    />
  ),

  "phones.verification-success": (
    <FormattedMessage id="phones.verification-success" defaultMessage={`Successfully verified phone number`} />
  ),

  "phones.removal-success": (
    <FormattedMessage id="phones.removal-success" defaultMessage={`Successfully removed phone number`} />
  ),

  "phones.code-sent": <FormattedMessage id="phones.code-sent" defaultMessage={`Successfully sent a code`} />,

  "phone.e164_format": (
    <FormattedMessage
      id="phone.e164_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`}
    />
  ),

  "phone.swedish_mobile_format": (
    <FormattedMessage
      id="phone.swedish_mobile_format"
      defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`}
    />
  ),
};
