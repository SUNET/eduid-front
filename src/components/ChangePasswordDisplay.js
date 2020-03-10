import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/Security.scss";

class ChangePasswordDisplay extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>{this.props.translate("settings.main_title")} </h4>
            <p>{this.props.translate("settings.long_description")}</p>
          </div>
          <div id="change-password">
            <EduIDButton
              id="security-change-button"
              className="btn-link"
              onClick={this.props.handleStartConfirmationPassword}
            >
              {this.props.translate("settings.change_password")}
            </EduIDButton>
          </div>
        </div>
        <GenericConfirmModal
          modalId="securityConfirmDialog"
          title={this.props.translate("settings.confirm_title_chpass")}
          mainText={this.props.translate("settings.change_info")}
          showModal={this.props.confirming_change}
          closeModal={this.props.handleStopConfirmationPassword}
          acceptModal={this.props.handleConfirmationPassword}
        />
      </div>
    );
  }
}

ChangePasswordDisplay.propTypes = {
  confirming_change: PropTypes.bool,
  handleStartConfirmationPassword: PropTypes.func,
  handleStopConfirmationPassword: PropTypes.func,
  handleConfirmationPassword: PropTypes.func
};

export default ChangePasswordDisplay;
