import React, { Fragment } from "react";
import EduIDButton from "components/EduIDButton";
import { FormattedMessage } from "react-intl";
import { EmailInfo } from "../../../reducers/Emails";
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
  let dataStatus;

  if (props.verified) {
    if (props.primary) {
      dataStatus = (
        <label>
          <FormattedMessage defaultMessage="PRIMARY" description="primary label" />
        </label>
      );
    } else {
      dataStatus = (
        <EduIDButton buttonstyle="link" size="sm" onClick={props.handleMakePrimary}>
          <FormattedMessage defaultMessage="MAKE PRIMARY" description="Make primary button" />
        </EduIDButton>
      );
    }
  } else {
    dataStatus = (
      <EduIDButton buttonstyle="link" size="sm" onClick={props.handleStartConfirmation}>
        <FormattedMessage defaultMessage="confirm" description="confirm button" />
      </EduIDButton>
    );
  }

  return <td className="value-status">{dataStatus}</td>;
}

function DataTableRow(props: DataTableProps) {
  const data = props.data;
  let row;

  if (!data) {
    row = <div />;
  } else {
    row = data.map((datum: { verified: boolean; primary: boolean }, i: number) => {
      const keysArray = Object.keys(datum);
      const valueArray = Object.values(datum);
      const valueName = keysArray[0];
      const value = valueArray[0];

      let valueStatus = "unverified";
      if (datum.verified) {
        valueStatus = "verified";
        if (datum.primary) {
          valueStatus = "primary";
        }
      }

      return (
        <tr className={`email-row ${valueStatus}`} data-identifier={valueName} data-object={value} key={i}>
          <td className={valueStatus}>{value}</td>
          <DataStatus
            verified={datum.verified}
            primary={datum.primary}
            handleStartConfirmation={props.handleStartConfirmation}
            handleMakePrimary={props.handleMakePrimary}
          />
          <td className="remove-data">
            <EduIDButton buttonstyle="close" size="sm" onClick={props.handleRemove} />
          </td>
        </tr>
      );
    });
  }
  return <Fragment>{row}</Fragment>;
}

function DataTable(props: DataTableProps) {
  return (
    <div className="table-responsive">
      <table className="table-form">
        <tbody>
          <DataTableRow {...props} />
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
