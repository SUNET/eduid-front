import { CopyToClipboard } from "components/Common/CopyToClipboard";
import { useAppSelector } from "eduid-hooks";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";

const idUserEppn = "user-eppn";

export function AccountId(): JSX.Element {
  const eppn = useAppSelector((state) => state.personal_data.eppn);
  const ref = useRef<HTMLInputElement>(null);

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
      <div className="profile-grid-cell figure tight">
        <span aria-label={idUserEppn}>
          <strong>
            <FormattedMessage defaultMessage="EPPN:" description="Dashboard AccountId" />
            &nbsp;
          </strong>
        </span>
        <div className="display-data">
          <input readOnly={true} name={eppn} id={idUserEppn} ref={ref} defaultValue={eppn} />
          <CopyToClipboard ref={ref} />
        </div>
      </div>
    </article>
  );
}
