import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../login/translation/InjectIntl_HOC_factory";

import DataStatus from "./DataStatus/DataStatus";
import ButtonRemoveData from "../../../login/components/Buttons/ButtonRemoveData";

class DataTableRow extends Component {
  render() {
    let data = this.props.data;
    // console.log("this is data:", data);
    let row = [];

    if (data) {
      row = data.map((datum, i) => {
        let keysArray = Object.keys(datum);
        let valueArray = Object.values(datum);
        let valueName = keysArray[0];
        let value = valueArray[0];

        let valueStatus = "unverified";
        if (datum.verified) {
          valueStatus = "verified";
        }

        return (
          <tr
            className="emailrow"
            data-identifier={valueName}
            data-object={value}
            key={i}
          >
            <td className={valueStatus}>{value}</td>
            <DataStatus
              verified={datum.verified}
              primary={datum.primary}
              handleStartConfirmation={this.props.handleStartConfirmation}
              handleMakePrimary={this.props.handleMakePrimary}
            />
            <td className="remove-data">
              <ButtonRemoveData
                className="icon-button"
                onClick={this.props.handleRemove}
              />
            </td>
          </tr>
        );
      });
    } else {
      row = <div />;
    }
    return <Fragment>{row}</Fragment>;
  }
}

DataTableRow.propTypes = {
  data: PropTypes.array.isRequired,
  handleStartConfirmation: PropTypes.func.isRequired,
  handleMakePrimary: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default i18n(DataTableRow);
