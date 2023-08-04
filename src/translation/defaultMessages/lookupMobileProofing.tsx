import { FormattedMessage } from "react-intl";

export const apiResponses = {
  "error_lookup_mobile_task": (
    <FormattedMessage
      id="error_lookup_mobile_task"
      defaultMessage={`Your phone number could not be found in the registry. Please try another method.`}
    />
  ),

  "nins.no-mobile-match": (
    <FormattedMessage
      id="nins.no-mobile-match"
      defaultMessage={`No phone number matching the given national id number`}
    />
  ),
};
