import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../translation/InjectIntl_HOC_factory";
import ButtonTableData from "../../../Buttons/ButtonTableData";

class DataStatus extends Component {
  render() {
    let dataStatus = "";

    if (this.props.verified) {
      if (this.props.primary) {
        dataStatus = <label>{this.props.translate("tl.primary")}</label>;
      } else {
        dataStatus = (
          <ButtonTableData
            className="table-button"
            onClick={this.props.handleMakePrimary}
            buttonText={this.props.translate("tl.make_primary")}
          />
        );
      }
    } else {
      dataStatus = (
        <ButtonTableData
          className="table-button"
          buttonText={this.props.translate("tl.pending")}
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

export default i18n(DataStatus);
