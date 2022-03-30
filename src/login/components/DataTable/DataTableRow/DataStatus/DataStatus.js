import React, { Component } from "react";
import PropTypes from "prop-types";
import i18n from "../../../../translation/InjectIntl_HOC_factory";
// import ButtonTableData from "../../../Buttons/ButtonTableData";
import EduIDButton from "components/EduIDButton";

class DataStatus extends Component {
  render() {
    let dataStatus = "";

    if (this.props.verified) {
      if (this.props.primary) {
        dataStatus = <label>{this.props.translate("tl.primary")}</label>;
      } else {
        dataStatus = (
          <EduIDButton color="link" size="sm" onClick={this.props.handleMakePrimary}>
            {this.props.translate("tl.make_primary")}
          </EduIDButton>
        );
      }
    } else {
      dataStatus = (
        <EduIDButton color="link" size="sm" onClick={this.props.handleStartConfirmation}>
          {this.props.translate("tl.pending")}
        </EduIDButton>
      );
    }

    return <td className="value-status">{dataStatus}</td>;
  }
}

DataStatus.propTypes = {
  verified: PropTypes.bool.isRequired,
  primary: PropTypes.bool.isRequired,
  handleStartConfirmation: PropTypes.func.isRequired,
  handleMakePrimary: PropTypes.func.isRequired,
};

export default i18n(DataStatus);
