import { useAppSelector } from "eduid-hooks";
import { FormattedMessage } from "react-intl";

const idUserEppn = "user-eppn";

export function AccountId(): JSX.Element {
  const eppn = useAppSelector((state) => state.personal_data.eppn);
  return (
    <article id="uniqueId-container">
      <h2>
        <FormattedMessage defaultMessage="EPPN - Unique ID" description="Dashboard AccountId" />
      </h2>
      <p>
        <FormattedMessage
          defaultMessage={`Eppn is a unique ID for your eduID that you may need to provide when requesting technical 
          support or to identify your account.`}
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
            {eppn}
          </output>
        </div>
      </div>
    </article>
  );
}
