import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

const idUserEppn = "user-eppn";

export function AccountId(): JSX.Element {
  const eppn = useDashboardAppSelector((state) => state.personal_data.eppn);

  return (
    <article id="uniqueId-container">
      <div className="intro">
        <h3>
          <FormattedMessage defaultMessage="Unique ID" description="Dashboard AccountId" />
        </h3>
        <p>
          <FormattedMessage
            defaultMessage="This is an automatically generated unique identifier for your eduID."
            description="Dashboard AccountId"
          />
        </p>
      </div>
      <div className="profile-grid-cell">
        <span aria-label={idUserEppn}>
          <strong>
            <FormattedMessage defaultMessage="eppn" description="Dashboard AccountId" />
          </strong>
        </span>
        <div className="display-data verified">
          <output name={eppn} id={idUserEppn}>
            {eppn}
          </output>
        </div>
        <p className="help-text">
          <FormattedMessage
            defaultMessage="You might be asked to share this information if you need technical support."
            description="Dashboard AccountId"
          />
        </p>
      </div>
    </article>
  );
}
