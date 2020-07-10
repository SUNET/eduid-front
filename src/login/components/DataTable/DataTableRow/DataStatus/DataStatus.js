import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import ButtonTableData from "../../../Buttons/ButtonTableData";

class DataStatus extends Component {
  render() {
    let dataStatus = "";

    if (this.props.verified) {
      if (this.props.primary) {
        dataStatus = <label>primary</label>;
      } else {
        dataStatus = (
          <ButtonTableData
            className="table-button"
            onClick={this.props.handleMakePrimary}
            buttonText={"Make Primary"}
          />
        );
      }
    } else {
      dataStatus = (
        <ButtonTableData
          className="table-button"
          buttonText={"Confirm"}
          onClick={this.props.handleStartConfirmation}
        />
      );
    }

    return <td className="value-status">{dataStatus}</td>;
  }
}

DataStatus.propTypes = {
  verified: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  handleStartConfirmation: PropTypes.func.isRequired,
  handleMakePrimary: PropTypes.func.isRequired
};

export default DataStatus;
