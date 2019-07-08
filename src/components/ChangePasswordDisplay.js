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
import ConfirmModal from "components/ConfirmModal";

import "style/Security.scss";

class ChangePasswordDisplay extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>Change password</h4>
            <p>{this.props.l10n("security.long_description")}</p>
          </div>
          <div id="change-password">
            <EduIDButton
              id="security-change-button"
              className="btn-link"
              onClick={this.props.handleStartConfirmationPassword}
            >
              {this.props.l10n("security.change_password")}
            </EduIDButton>
          </div>
        </div>
        <GenericConfirmModal
          modalId="securityConfirmDialog"
          title={this.props.l10n("security.confirm_title_chpass")}
          mainText={this.props.l10n("security.change_info")}
          showModal={this.props.confirming_change}
          closeModal={this.props.handleStopConfirmationPassword}
          acceptModal={this.props.handleConfirmationPassword}
        />
        <ConfirmModal
          modalId="describeWebauthnTokenDialog"
          id="describeWebauthnTokenDialogControl"
          title={this.props.l10n("security.webauthn-describe-title")}
          resendLabel=""
          resendHelp=""
          resendText=""
          placeholder=""
          with_resend_link={false}
          showModal={Boolean(this.props.webauthn_asking_description)}
          closeModal={this.props.handleStopAskingWebauthnDescription}
          handleConfirm={this.props.handleStartWebauthnRegistration}
        />
      </div>
    );
  }
}

// Security.propTypes = {
//   credentials: PropTypes.array,
//   creation_date: PropTypes.string,
//   last_used: PropTypes.string,
//   langs: PropTypes.array,
//   confirming_change: PropTypes.bool,
//   deleted: PropTypes.bool,
//   handleStartConfirmationPassword: PropTypes.func,
//   handleStopConfirmationPassword: PropTypes.func,
//   handleConfirmationPassword: PropTypes.func,
//   confirming_deletion: PropTypes.bool,
//   handleStartConfirmationDeletion: PropTypes.func,
//   handleStopConfirmationDeletion: PropTypes.func,
//   handleConfirmationDeletion: PropTypes.func,
//   handleStartWebauthnRegistration: PropTypes.func,
//   handleCloseWebauthnModal: PropTypes.func
// };

//  export default PasswordChange;

const mapStateToProps = (state, props) => {
  return {
    credentials: state.security.credentials,
    confirming_change: state.security.confirming_change,
    confirming_deletion: state.security.confirming_deletion,
    redirect_to: state.security.location,
    deleted: state.security.deleted,
    webauthn_asking_description: state.security.webauthn_asking_description,
    authenticator: state.security.webauthn_authenticator
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
    handleConfirmationPassword: e => {
      dispatch(confirmPasswordChange());
    }
  };
};

const ChangePasswordDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePasswordDisplay);

export default i18n(ChangePasswordDisplayContainer);
