import React, { Fragment } from "react";
import EduIDButton from "components/EduIDButton";
import { FormattedMessage } from "react-intl";
import { EmailInfo } from "../../../apis/eduidEmail";
import { PDPhone } from "../../../apis/personalData";

interface DataTableProps {
  data?: EmailInfo[] | PDPhone[];
  handleStartConfirmation: (event: React.MouseEvent<HTMLElement>) => void;
  handleMakePrimary: (event: React.MouseEvent<HTMLElement>) => void;
  handleRemove: (event: React.MouseEvent<HTMLElement>) => void;
}

interface DataStatusProps {
  verified: boolean;
  primary: boolean;
  handleStartConfirmation: (event: React.MouseEvent<HTMLElement>) => void;
  handleMakePrimary: (event: React.MouseEvent<HTMLElement>) => void;
}

function DataStatus(props: DataStatusProps) {
  if (!props.verified) {
    return (
      <EduIDButton buttonstyle="link" size="sm" onClick={props.handleStartConfirmation}>
        <FormattedMessage defaultMessage="confirm" description="confirm button" />
      </EduIDButton>
    );
  }
  if (props.primary) {
    return (
      <label>
        <FormattedMessage defaultMessage="primary" description="primary label" />
      </label>
    );
  }
  return (
    <EduIDButton buttonstyle="link" size="sm" onClick={props.handleMakePrimary}>
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
      {props.data.map((datum: { verified: boolean; primary: boolean }, i: number) => {
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
                verified={datum.verified}
                primary={datum.primary}
                handleStartConfirmation={props.handleStartConfirmation}
                handleMakePrimary={props.handleMakePrimary}
              />
            </td>
            <td className="remove-data">
              <EduIDButton buttonstyle="close" size="sm" onClick={props.handleRemove} />
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
      <table className="table-form">
        <tbody>
          <DataTableRows {...props} />
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
