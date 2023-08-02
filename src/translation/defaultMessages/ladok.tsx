import { FormattedMessage } from "react-intl";

// Translations of messages from the Ladok backend
export const apiResponses = {
  "ladok.no-data-for-user": (
    <FormattedMessage
      id="ladok.no-data-for-user"
      defaultMessage="No information for you found in Ladok with that institution."
    />
  ),

  "ladok.no-verified-nin": (
    <FormattedMessage
      id="ladok.no-verified-nin"
      defaultMessage="You need a verified Swedish national identity number to link your account with Ladok."
    />
  ),

  "ladok.missing-university": (
    <FormattedMessage
      id="ladok.missing-university"
      defaultMessage="Unknown higher education institution. Please try again later."
    />
  ),
};
