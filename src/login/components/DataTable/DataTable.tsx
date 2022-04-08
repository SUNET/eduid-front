import React, { Component, Fragment } from "react";
import EduIDButton from "components/EduIDButton";
import { FormattedMessage } from "react-intl";

// function DataStatus(props: any) {
//   let dataStatus;

//   if (props.verified) {
//     if (props.primary) {
//       dataStatus = (
//         <label>
//           <FormattedMessage defaultMessage="PRIMARY" description="primary label" />
//         </label>
//       );
//       {
//         /* {props.translate("tl.primary")}</label>; */
//       }
//     } else {
//       dataStatus = (
//         <EduIDButton buttonstyle="link" size="sm" onClick={props.handleMakePrimary}>
//           <FormattedMessage defaultMessage="MAKE PRIMARY" description="Make primary button" />

//           {/* {props.translate("tl.make_primary")} */}
//         </EduIDButton>
//       );
//     }
//   } else {
//     dataStatus = (
//       <EduIDButton buttonstyle="link" size="sm" onClick={props.handleStartConfirmation}>
//         <FormattedMessage defaultMessage="confirm" description="confirm button" />
//         {/* {props.translate("tl.pending")} */}
//       </EduIDButton>
//     );
//   }

//   return <td className="value-status">{dataStatus}</td>;
// }

// function DataTableRow(props: any) {
//   const data = props.data;

//   let row: any = [];

//   if (data) {
//     row = data.map((datum: any, i: number) => {
//       const keysArray = Object.keys(datum);
//       const valueArray = Object.values(datum);
//       const valueName = keysArray[0];
//       const value = valueArray[0];

//       let valueStatus = "unverified";
//       if (datum.verified) {
//         valueStatus = "verified";
//         if (datum.primary) {
//           valueStatus = "primary";
//         }
//       }

//       return (
//         <tr className={`emailrow ${valueStatus}`} data-identifier={valueName} data-object={value} key={i}>
//           <td className={valueStatus}>{value as any}</td>
//           <DataStatus
//             verified={datum.verified}
//             primary={datum.primary}
//             handleStartConfirmation={props.handleStartConfirmation}
//             handleMakePrimary={props.handleMakePrimary}
//           />
//           <td className="remove-data">
//             <EduIDButton buttonstyle="close" size="sm" onClick={props.handleRemove} />
//           </td>
//         </tr>
//       );
//     });
//   } else {
//     row = <div />;
//   }
//   return <Fragment>{row}</Fragment>;
// }

function DataTable(props: any) {
  console.log("props.handleRemove", props.handleRemove);
  let dataStatus: any;

  if (props.verified) {
    if (props.primary) {
      dataStatus = (
        <label>
          <FormattedMessage defaultMessage="PRIMARY" description="primary label" />
        </label>
      );
      {
        /* {props.translate("tl.primary")}</label>; */
      }
    } else {
      dataStatus = (
        <EduIDButton buttonstyle="link" size="sm" onClick={props.handleMakePrimary}>
          <FormattedMessage defaultMessage="MAKE PRIMARY" description="Make primary button" />

          {/* {props.translate("tl.make_primary")} */}
        </EduIDButton>
      );
    }
  } else {
    dataStatus = (
      <EduIDButton buttonstyle="link" size="sm" onClick={props.handleStartConfirmation}>
        <FormattedMessage defaultMessage="confirm" description="confirm button" />
        {/* {props.translate("tl.pending")} */}
      </EduIDButton>
    );
  }

  const data = props.data;

  let row: any = [];

  if (data) {
    row = data.map((datum: any, i: number) => {
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
        <tr className={`emailrow ${valueStatus}`} data-identifier={valueName} data-object={value} key={i}>
          <td className={valueStatus}>{value as any}</td>
          <td className="value-status">{dataStatus}</td>
          {/* <DataStatus
            verified={datum.verified}
            primary={datum.primary}
            handleStartConfirmation={props.handleStartConfirmation}
            handleMakePrimary={props.handleMakePrimary}
          /> */}
          <td className="remove-data">
            <EduIDButton buttonstyle="close" size="sm" onClick={props.handleRemove} />
          </td>
        </tr>
      );
    });
  } else {
    row = <div />;
  }
  // return <Fragment>{row}</Fragment>;

  return (
    <div className="table-responsive">
      <table className="table-form">
        <tbody>{row}</tbody>
      </table>
    </div>
  );
}

export default DataTable;
