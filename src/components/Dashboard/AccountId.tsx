import { useDashboardAppSelector } from "dashboard-hooks";
import { FormattedMessage } from "react-intl";

const idUserEppn = "user-eppn";

export function AccountId(): JSX.Element {
  const eppn = useDashboardAppSelector((state) => state.personal_data.eppn);
  return (
    <article id="uniqueId-container">
      <h2>
        <FormattedMessage defaultMessage="EPPN - username" description="Dashboard AccountId" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`Eppn is a unique identifier for your eduID that you may need to provide when accessing other services or requesting  
          support.`}
          description="Dashboard AccountId"
        />
      </p>
      <div className="profile-grid-cell">
        <span aria-label={idUserEppn}>
          <strong>
            <FormattedMessage defaultMessage="EPPN:" description="Dashboard AccountId" />
            &nbsp;
          </strong>
        </span>
        <div className="display-data">
          <output name={eppn} id={idUserEppn}>
            {eppn}@eduid.se
          </output>
        </div>
      </div>
    </article>
  );
}
