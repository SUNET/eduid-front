import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import { connect } from "react-redux";
import i18n from "i18n-messages";
import { isValid } from "redux-form";
// import * as actions from "actions/Security";
import {
  confirmPasswordChange,
  startConfirmationPassword,
  stopConfirmationPassword,
  confirmDeletion,
  stopConfirmationDeletion,
  startConfirmationDeletion,
  postRemoveWebauthnToken,
  postVerifyWebauthnToken,
  startWebauthnRegistration,
  startAskWebauthnDescription,
  stopAskWebauthnDescription,
  chooseAuthenticator
} from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";

import EduIDButton from "components/EduIDButton";
import DeleteModal from "components/DeleteModal";
import GenericConfirmModal from "components/GenericConfirmModal";
import ConfirmModal from "components/ConfirmModal";

import "style/Security.scss";

class DeleteAccount extends Component {
  render() {
    if (this.props.redirect_to !== "") {
      window.location.href = this.props.redirect_to;
      return null;
    }
    if (this.props.deleted) {
      window.location.href = "https://eduid.se";
      return null;
    }

    const url = window.location.href;
    return (
      <div>
        <div id="delete-account-container">
          <div className="intro">
            <h4>{this.props.l10n("security.account_title")}</h4>
            <p>{this.props.l10n("security.account_description")}</p>
          </div>
          <EduIDButton
            className="btn-link"
            id="delete-button"
            onClick={this.props.handleStartConfirmationDeletion}
          >
            {this.props.l10n("security.delete_account")}
          </EduIDButton>
        </div>

        <DeleteModal
          title={this.props.l10n("security.confirm_title_deletion")}
          showModal={this.props.confirming_deletion}
          closeModal={this.props.handleStopConfirmationDeletion}
          handleConfirm={this.props.handleConfirmationDeletion}
        />
      </div>
    );
  }
}

// DeleteAccount.propTypes = {
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

// export default DeleteAccount;

// export default VerifyIdentity;
const mapStateToProps = (state, props) => {
  // let verifiedNin;
  // const nins = state.nins.nins.filter(nin => nin.verified);
  // if (nins.length >= 1) {
  //   verifiedNin = true;
  // } else {
  //   verifiedNin = false;
  // }
  // const phoneNumber = state.phones.phones.filter(phone => phone.primary);
  // const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    credentials: state.security.credentials,
    // confirming_change: state.security.confirming_change,
    confirming_deletion: state.security.confirming_deletion,
    redirect_to: state.security.location,
    deleted: state.security.deleted,
    // webauthn_asking_description: state.security.webauthn_asking_description,
    // authenticator: state.security.webauthn_authenticator
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    // handleStartConfirmationPassword: function(e) {
    //   dispatch(eduidRMAllNotify());
    //   dispatch(startConfirmationPassword());
    // },
    // handleStopConfirmationPassword: function(e) {
    //   dispatch(stopConfirmationPassword());
    // },
    // handleConfirmationPassword: e => {
    //   dispatch(confirmPasswordChange());
    // },
    handleStartConfirmationDeletion: function(e) {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function(e) {
      dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function(e) {
      dispatch(confirmDeletion());
    },
    // handleStartAskingKeyWebauthnDescription: function(e) {
    //   dispatch(eduidRMAllNotify());
    //   dispatch(chooseAuthenticator("cross-platform"));
    //   dispatch(startAskWebauthnDescription());
    // },
    // handleStartAskingDeviceWebauthnDescription: function(e) {
    //   dispatch(eduidRMAllNotify());
    //   dispatch(chooseAuthenticator("platform"));
    //   dispatch(startAskWebauthnDescription());
    // },
    // handleStopAskingWebauthnDescription: function(e) {
    //   dispatch(stopAskWebauthnDescription());
    // },
    // handleStartWebauthnRegistration: function(e) {
    //   const description = document.getElementById(
    //     "describeWebauthnTokenDialogControl"
    //   ).children[0].value;
    //   dispatch(stopAskWebauthnDescription());
    //   dispatch(startWebauthnRegistration(description));
    // },
    // handleRemoveWebauthnToken: function(e) {
    //   const token = e.target.closest(".webauthn-token-holder").dataset.token;
    //   dispatch(postRemoveWebauthnToken(token));
    // },
    // handleVerifyWebauthnToken: function(e) {
    //   const token = e.target.closest(".webauthn-token-holder").dataset.token;
    //   dispatch(postVerifyWebauthnToken(token));
    // }
  };
};

const DeleteAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAccount);

export default i18n(DeleteAccountContainer);
