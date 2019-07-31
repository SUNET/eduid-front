import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import {
  confirmPasswordChange,
  startConfirmationPassword,
  stopConfirmationPassword
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import EduIDButton from "components/EduIDButton";
import GenericConfirmModal from "components/GenericConfirmModal";

import "style/Security.scss";

class ChangePasswordDisplay extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>{this.props.l10n("settings.main_title")} </h4>
            <p>{this.props.l10n("settings.long_description")}</p>
          </div>
          <div id="change-password">
            <EduIDButton
              id="security-change-button"
              className="btn-link"
              onClick={this.props.handleStartConfirmationPassword}
            >
              {this.props.l10n("settings.change_password")}
            </EduIDButton>
          </div>
        </div>
        <GenericConfirmModal
          modalId="securityConfirmDialog"
          title={this.props.l10n("settings.confirm_title_chpass")}
          mainText={this.props.l10n("settings.change_info")}
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

// export default ChangePasswordDisplay;

const mapStateToProps = (state, props) => {
  return {
    // credentials: state.security.credentials,
    confirming_change: state.security.confirming_change
    // confirming_deletion: state.security.confirming_deletion,
    // redirect_to: state.security.location,
    // deleted: state.security.deleted,
    // webauthn_asking_description: state.security.webauthn_asking_description,
    // authenticator: state.security.webauthn_authenticator
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleStartConfirmationPassword: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function(e) {
      dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: function(e) {
      dispatch(confirmPasswordChange());
    }
  };
};

const ChangePasswordDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordDisplay);

export default i18n(ChangePasswordDisplayContainer);
