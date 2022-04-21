import React, { Fragment } from "react";
import { EmailInfo } from "../reducers/Emails";
import { PDPhone } from "../apis/personalData";
import EduIDButton from "components/EduIDButton";
import { FormattedMessage } from "react-intl";

interface DataTableProps {
  data?: EmailInfo[];
}

function MakePrimaryTable(props: DataTableProps) {
  const data = props.data;

  const handleRemove = (index: number) => {};

  return (
    <div className="table-responsive">
      <table className="table-form">
        <tbody>
          {data?.map((item, index) => (
            <tr
              className={`email-row ${item.primary ? "primary" : item.verified ? "verified" : "unverified"}`}
              data-identifier={Object.keys(item)[0]}
              data-object={Object.values(item)[0]}
              key={index}
            >
              <td key={index}> {item.email}</td>
              {item.verified ? (
                <td>
                  {item.primary ? (
                    <label>
                      <FormattedMessage defaultMessage="PRIMARY" description="primary label" />
                    </label>
                  ) : (
                    <EduIDButton buttonstyle="link" size="sm">
                      <FormattedMessage defaultMessage="MAKE PRIMARY" description="Make primary button" />
                    </EduIDButton>
                  )}
                </td>
              ) : (
                <td>
                  <EduIDButton buttonstyle="link" size="sm">
                    <FormattedMessage defaultMessage="confirm" description="confirm button" />
                  </EduIDButton>
                </td>
              )}

              <td className="remove-data">
                <EduIDButton buttonstyle="close" size="sm" onClick={() => handleRemove(index)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MakePrimaryTable;
