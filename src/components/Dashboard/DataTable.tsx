import EduIDButton from "components/Common/EduIDButton";
import React, { Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { EmailInfo } from "services/email";

interface DataTableProps {
  data?: EmailInfo[];
  handleStartConfirmation: (event: React.MouseEvent<HTMLElement>) => void;
  handleMakePrimary: (event: React.MouseEvent<HTMLElement>) => void;
  handleRemove: (event: React.MouseEvent<HTMLElement>) => void;
}

interface DataStatusProps {
  name?: string;
  verified: boolean;
  primary: boolean;
  handleStartConfirmation: (event: React.MouseEvent<HTMLElement>) => void;
  handleMakePrimary: (event: React.MouseEvent<HTMLElement>) => void;
}

function DataStatus(props: DataStatusProps) {
  if (!props.verified) {
    return (
      <EduIDButton buttonstyle="link sm" onClick={props.handleStartConfirmation}>
        {props.name === "number" ? (
          <FormattedMessage defaultMessage="unverified" description="unverified" />
        ) : (
          <FormattedMessage defaultMessage="confirm" description="confirm button" />
        )}
      </EduIDButton>
    );
  }
  if (props.primary) {
    return (
      <span>
        <FormattedMessage defaultMessage="PRIMARY" description="primary label" />
      </span>
    );
  }
  return (
    <EduIDButton buttonstyle="link sm" onClick={props.handleMakePrimary}>
      <FormattedMessage defaultMessage="make primary" description="Make primary button" />
    </EduIDButton>
  );
}

function DataTableRows(props: DataTableProps) {
  if (!props.data) {
    return null;
  }

  return (
    <Fragment>
      {props.data.map((datum: { email?: string; number?: string; verified: boolean; primary: boolean }, i: number) => {
        const keysArray = Object.keys(datum);
        const valueArray = Object.values(datum);
        const valueName = keysArray[0];
        const value = valueArray[0];

        let valueStatus;
        if (!datum.verified) {
          valueStatus = "unverified";
        } else if (datum.primary) {
          valueStatus = "primary";
        } else valueStatus = "verified";

        return (
          <tr className={`${valueName} ${valueStatus}`} data-identifier={valueName} data-object={value} key={i}>
            <td className={valueStatus}>{value}</td>
            <td className="value-status">
              <DataStatus
                name={valueName}
                verified={datum.verified}
                primary={datum.primary}
                handleStartConfirmation={props.handleStartConfirmation}
                handleMakePrimary={props.handleMakePrimary}
              />
            </td>
            {/* not render the close button when there is only one email */}
            <td className="remove-data">
              {(props.data && props.data?.length > 1 && valueName === "email") || valueName === "number" ? (
                <EduIDButton buttonstyle="remove sm" onClick={props.handleRemove} />
              ) : null}
            </td>
          </tr>
        );
      })}
    </Fragment>
  );
}

function DataTable(props: DataTableProps) {
  return (
    <div className="table-responsive">
      <table className="table-form" role="presentation">
        <tbody>
          <tr className="display-none">
            <th>
              <FormattedMessage description="name" defaultMessage="name" />
            </th>
            <th>
              <FormattedMessage description="status" defaultMessage="status" />
            </th>
            <th>
              <FormattedMessage description="remove" defaultMessage="remove" />
            </th>
          </tr>
          <DataTableRows {...props} />
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
