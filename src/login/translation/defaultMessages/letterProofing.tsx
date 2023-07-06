import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "letter.no_state_found": <FormattedMessage id="letter.no_state_found" defaultMessage={`No state found`} />,

  "letter.already-sent": (
    <FormattedMessage id="letter.already-sent" defaultMessage={`You have already been sent a verification letter`} />
  ),

  "letter.no-address-found": (
    <FormattedMessage id="letter.no-address-found" defaultMessage={`No postal address found`} />
  ),

  "letter.bad-postal-address": (
    <FormattedMessage
      id="letter.bad-postal-address"
      defaultMessage={`The registered postal address is not a valid address`}
    />
  ),

  "letter.saved-unconfirmed": (
    <FormattedMessage id="letter.saved-unconfirmed" defaultMessage={`A letter with a code has been sent.`} />
  ),

  "letter.wrong-code": <FormattedMessage id="letter.wrong-code" defaultMessage={`Incorrect code`} />,

  "letter.verification_success": (
    <FormattedMessage id="letter.verification_success" defaultMessage={`Successfully verified national id number`} />
  ),

  "letter.not-sent": (
    <FormattedMessage id="letter.not-sent" defaultMessage={`Letter send request failed. Please try again.`} />
  ),
};
