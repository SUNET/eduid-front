import { FormattedMessage } from "react-intl";

export const apiResponse = {
  // TODO: These _should_ be unused now - check and remove
  "Temporary technical problems": (
    <FormattedMessage
      id="Temporary technical problems"
      defaultMessage={`Temporary technical problems, please try again later`}
    />
  ),

  out_of_sync: (
    <FormattedMessage id="out_of_sync" defaultMessage={`User data is out of sync. Reload page to re-sync.`} />
  ),

  // system errors
  error_navet_task: <FormattedMessage id="error_navet_task" defaultMessage={`Communication problem with Navet`} />,

  // user errors
  "nin needs to be formatted as 18|19|20yymmddxxxx": (
    <FormattedMessage
      id="nin needs to be formatted as 18|19|20yymmddxxxx"
      defaultMessage={`National identity number needs to be in the form of yyyymmddxxxx`}
    />
  ),

  "email.invalid_email": <FormattedMessage id="email.invalid_email" defaultMessage={`The entered email is invalid`} />,

  "user-out-of-sync": (
    <FormattedMessage id="user-out-of-sync" defaultMessage={`User data is out of sync. Reload page to re-sync.`} />
  ),

  "code.unknown-code": <FormattedMessage id="code.unknown-code" defaultMessage={`Unknown code`} />,

  "csrf.try-again": (
    <FormattedMessage
      id="csrf.try-again"
      defaultMessage={`There was a problem with your submission, please try again`}
    />
  ),
  "still-valid-code": (
    <FormattedMessage
      id="still-valid-code"
      defaultMessage={`You have recently been sent a code. Please wait at least 5 minutes to request a new one.`}
    />
  ),
  "common.locked_identity_not_matching": (
    <FormattedMessage id="common.locked_identity_not_matching" defaultMessage={`Identity not matching`} />
  ),
};

export const proofing = {
  "proofing.malformed_identity": (
    <FormattedMessage
      id="proofing.malformed_identity"
      defaultMessage={`Incorrect format of the identity number. Please try again.`}
    />
  ),
  "proofing.attribute_missing": (
    <FormattedMessage
      id="proofing.attribute_missing"
      defaultMessage={`Information necessary for identification is missing. Please try again.`}
    />
  ),
};

export const personalData = {
  "pd.save-success": <FormattedMessage id="pd.save-success" defaultMessage={`Personal information updated`} />,

  "pdata.field_required": <FormattedMessage id="pdata.field_required" defaultMessage={`This field is required`} />,

  "pdata.display_name_invalid": (
    <FormattedMessage id="pdata.display_name_invalid" defaultMessage={`Invalid display name. Please choose again.`} />
  ),
};

export const validations = {
  // Validation error
  required: <FormattedMessage id="required" defaultMessage={`*Field cannot be empty`} />,

  "invalid username": <FormattedMessage id="invalid username" defaultMessage={`Invalid username`} />,

  error_in_form: <FormattedMessage id="error_in_form" defaultMessage={`Check the form below for errors.`} />,

  "chpass.low-password-entropy": (
    <FormattedMessage id="chpass.low-password-entropy" defaultMessage={`Please provide a stronger password`} />
  ),

  // password strength
  "pwfield.terrible": <FormattedMessage id="pwfield.terrible" defaultMessage={`Extremely weak password`} />,

  "pwfield.bad": <FormattedMessage id="pwfield.bad" defaultMessage={`Very weak password`} />,

  "pwfield.weak": <FormattedMessage id="pwfield.weak" defaultMessage={`Weak password`} />,

  "pwfield.good": <FormattedMessage id="pwfield.good" defaultMessage={`Fairly strong password`} />,

  "pwfield.strong": <FormattedMessage id="pwfield.strong" defaultMessage={`Strong password`} />,

  "pwfield.repeat_different": (
    <FormattedMessage
      id="pwfield.repeat_different"
      defaultMessage={`The repeated password is different from the first`}
    />
  ),

  //nins
  "nins.invalid_nin": <FormattedMessage id="nins.invalid_nin" defaultMessage={`Invalid national id number`} />,

  "nins.wrong_length": (
    <FormattedMessage id="nins.wrong_length" defaultMessage={`A national id number must have 12 digits`} />
  ),

  "nins.illegal_chars": (
    <FormattedMessage id="nins.illegal_chars" defaultMessage={`A national id number can only have digits`} />
  ),

  //phone
  "phones.code_invalid": <FormattedMessage id="phones.code_invalid" defaultMessage={`Invalid code`} />,

  "phones.invalid_phone": <FormattedMessage id="phones.invalid_phone" defaultMessage={`Invalid phone number`} />,

  "phones.duplicated": (
    <FormattedMessage id="phones.duplicated" defaultMessage={`The number is already in the list.`} />
  ),

  // emails
  "emails.duplicated": <FormattedMessage id="emails.duplicated" defaultMessage={`The email is already in the list.`} />,

  "confirmation.code_invalid_format": (
    <FormattedMessage
      id="confirmation.code_invalid_format"
      defaultMessage={`Invalid code`}
      description="error text for invalid code"
    />
  ),
  "security.description_invalid_format": (
    <FormattedMessage
      id="security.description_invalid_format"
      defaultMessage={`The description is too long`}
      description="Error message for max length"
    />
  ),
};
