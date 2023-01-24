import { Orcid } from "components/Orcid";
import { FormattedMessage } from "react-intl";

import "../login/styles/index.scss";

export function AccountLinking() {
  return (
    <article id="orcid-connect-container">
      <div className="intro">
        <h2>
          <FormattedMessage defaultMessage="ORCID account" description="Dashboard AccountLinking" />
        </h2>
        <p>
          <FormattedMessage
            defaultMessage="If you are a researcher with an ORCID iD you can share it with your eduID."
            description="Dashboard AccountLinking"
          />
        </p>
      </div>
      <div>
        <Orcid />
      </div>
    </article>
  );
}
