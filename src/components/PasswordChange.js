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

class PasswordChange extends Component {
  // checkWebauthnDevice() {
  //   if (
  //     window.PublicKeyCredential === undefined ||
  //     typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !==
  //     "function"
  //   ) {
  //     return false;
  //   }
  //   PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  //     .then(available => available)
  //     .catch(error => {
  //       console.log("Error checking for platform authenticator:", error);
  //       return false;
  //     });
  // }

  render() {
    const url = window.location.href;

    // if (this.props.redirect_to !== "") {
    //   window.location.href = this.props.redirect_to;
    //   return null;
    // }
    // if (this.props.deleted) {
    //   window.location.href = "https://eduid.se";
    //   return null;
    // }
    // const tokens = this.props.credentials.filter(
    //   cred => cred.credential_type !== "security.password_credential_type"
    // );
    // const creds_table = this.props.credentials.map((cred, index) => {
    //   let btnRemove = "";
    //   let btnVerify = "";
    //   if (
    //     tokens.length > 1 &&
    //     cred.credential_type !== "security.password_credential_type"
    //   ) {
    //     btnRemove = (
    //       <div className="btn-group btn-group-sm" role="group">
    //         <button
    //           className="btn-link btn-remove-webauthn"
    //           onClick={this.props.handleRemoveWebauthnToken}
    //         >
    //           {this.props.l10n("security.remove")}
    //         </button>
    //       </div>
    //     );
    //   }
    //   if (cred.credential_type !== "security.password_credential_type") {
    //     if (cred.verified) {
    //       btnVerify = (
    //         <div className="btn-group btn-group-sm" role="group">
    //           <button className="btn-link btn-verified-webauthn" disabled>
    //             {this.props.l10n("security.verified")}
    //           </button>
    //         </div>
    //       );
    //     } else if (cred.used_for_login && !cred.verified) {
    //       btnVerify = (
    //         <div className="btn-group btn-group-sm" role="group">
    //           <button
    //             className="btn-link btn-verify-webauthn"
    //             onClick={this.props.handleVerifyWebauthnToken}
    //           >
    //             {this.props.l10n("security.verify")}
    //           </button>
    //         </div>
    //       );
    //     }
    //   }
    //   const date_created = new Date(cred.created_ts)
    //     .toISOString()
    //     .split("T")[0];
    //   let date_success = "";
    //   if (cred.success_ts) {
    //     date_success = new Date(cred.success_ts).toISOString().split("T")[0];
    //   }
    //   return (
    //     <tr key={index} className="webauthn-token-holder" data-token={cred.key}>
    //       <td>{this.props.l10n(cred.credential_type)}</td>
    //       <td
    //         data-toggle="tooltip"
    //         data-placement="top"
    //         title={new Date(cred.created_ts).toString()}
    //       >
    //         {date_created}
    //       </td>
    //       <td
    //         data-toggle="tooltip"
    //         data-placement="top"
    //         title={new Date(cred.success_ts).toString()}
    //       >
    //         {date_success}
    //       </td>
    //       <td>{cred.description}</td>
    //       <td>{btnVerify}</td>
    //       <td>{btnRemove}</td>
    //     </tr>
    //   );
    // }, this);

    // let platformAuthenticatorButton = "";
    // if (this.checkWebauthnDevice()) {
    //   platformAuthenticatorButton = (
    //     <div id="add-webauthn-token-platform">
    //       <EduIDButton
    //         id="security-webauthn-platform-button"
    //         onClick={this.props.handleStartAskingDeviceWebauthnDescription}
    //       >
    //         {this.props.l10n("security.add_webauthn_token_device")}
    //       </EduIDButton>
    //     </div>
    //   );
    // }

    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>Change password</h4>
            <p>{this.props.l10n("security.long_description")}</p>
          </div>
          {/* <table className="table table-bordered table-form passwords">
            <tbody>
              <tr>
                <th>{this.props.l10n("security.credential")}</th>
                <th>{this.props.l10n("security.creation_date")}</th>
                <th>{this.props.l10n("security.last_used")}</th>
                <th>{this.props.l10n("security.description")}</th>
                <th>{this.props.l10n("security.verify")}</th>
                <th>{this.props.l10n("security.remove")}</th>
              </tr>
              {creds_table}
            </tbody>
          </table> */}
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
    handleStartConfirmationPassword: function (e) {
      dispatch(eduidRMAllNotify());
      dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function (e) {
      dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: e => {
      dispatch(confirmPasswordChange());
    },
    // handleStartConfirmationDeletion: function (e) {
    //   dispatch(eduidRMAllNotify());
    //   dispatch(startConfirmationDeletion());
    // },
    // handleStopConfirmationDeletion: function (e) {
    //   dispatch(stopConfirmationDeletion());
    // },
    // handleConfirmationDeletion: function (e) {
    //   dispatch(confirmDeletion());
    // },
  //   handleStartAskingKeyWebauthnDescription: function (e) {
  //     dispatch(eduidRMAllNotify());
  //     dispatch(chooseAuthenticator("cross-platform"));
  //     dispatch(startAskWebauthnDescription());
  //   },
  //   handleStartAskingDeviceWebauthnDescription: function (e) {
  //     dispatch(eduidRMAllNotify());
  //     dispatch(chooseAuthenticator("platform"));
  //     dispatch(startAskWebauthnDescription());
  //   },
  //   handleStopAskingWebauthnDescription: function (e) {
  //     dispatch(stopAskWebauthnDescription());
  //   },
  //   handleStartWebauthnRegistration: function (e) {
  //     const description = document.getElementById(
  //       "describeWebauthnTokenDialogControl"
  //     ).children[0].value;
  //     dispatch(stopAskWebauthnDescription());
  //     dispatch(startWebauthnRegistration(description));
  //   },
  //   handleRemoveWebauthnToken: function (e) {
  //     const token = e.target.closest(".webauthn-token-holder").dataset.token;
  //     dispatch(postRemoveWebauthnToken(token));
  //   },
  //   handleVerifyWebauthnToken: function (e) {
  //     const token = e.target.closest(".webauthn-token-holder").dataset.token;
  //     dispatch(postVerifyWebauthnToken(token));
  //   }
   };
};

const PasswordDisplayContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordChange);

export default i18n(PasswordDisplayContainer);