import { Orcid } from "components/Dashboard/Orcid";
import { FormattedMessage } from "react-intl";

export function AccountLinking() {
  return (
    <article id="orcid-connect-container">
      <h2>
        <FormattedMessage defaultMessage="ORCID account" description="Dashboard AccountLinking" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage="If you are a researcher with an ORCID iD you can share it with your eduID."
          description="Dashboard AccountLinking"
        />
      </p>
      <Orcid />
    </article>
  );
}
