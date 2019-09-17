import React, { Component } from "react";
import PropTypes from "prop-types";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import EduIDButton from "components/EduIDButton";
import GenericConfirmModal from "components/GenericConfirmModal";
import ConfirmModal from "components/ConfirmModal";

import "style/Security.scss";

class Security extends Component {
  checkWebauthnDevice() {
    if (
      window.PublicKeyCredential === undefined ||
      typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable !==
        "function"
    ) {
      return false;
    }
    PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      .then(available => available)
      .catch(error => {
        console.log("Error checking for platform authenticator:", error);
        return false;
      });
  }

  render() {
    let btnVerify = "";
    let platformAuthenticatorButton = "";
    let date_success = "";

    let securitykey_table = "";
    // filter out password from data
    const tokens = this.props.credentials.filter(
      cred => cred.credential_type !== "security.password_credential_type"
    );

    // data that goes onto the table
    const secirutykey_table_data = tokens.map((cred, index) => {
      // date created
      const date_created = new Date(cred.created_ts)
        .toISOString()
        .split("T")[0];
      // date last used
      if (cred.success_ts) {
        date_success = new Date(cred.success_ts).toISOString().split("T")[0];
      } else {
        date_success = this.props.l10n("security.last-used.date");
      }

      // verify button/ verified badge
      if (cred.verified) {
        btnVerify = (
          <EduIDButton className="btn-link verified" disabled>
            {this.props.l10n("security.verified")}
          </EduIDButton>
        );
      } else {
        btnVerify = (
          <EduIDButton
            className="btn-link verify-status-label"
            onClick={this.props.handleVerifyWebauthnToken}
          >
            {this.props.l10n("security.verify")}
          </EduIDButton>
        );
      }

      if (this.checkWebauthnDevice()) {
        platformAuthenticatorButton = (
          <div id="add-webauthn-token-platform">
            <EduIDButton
              id="security-webauthn-platform-button"
              onClick={this.props.handleStartAskingDeviceWebauthnDescription}
            >
              {this.props.l10n("security.add_webauthn_token_device")}
            </EduIDButton>
          </div>
        );
      }

      return (
        <tr key={index} className="webauthn-token-holder" data-token={cred.key}>
          <td>{cred.description}</td>
          <td
            data-toggle="tooltip"
            data-placement="top"
            title={new Date(cred.created_ts).toString()}
          >
            {date_created}
          </td>
          <td
            data-toggle="tooltip"
            data-placement="top"
            title={new Date(cred.success_ts).toString()}
          >
            {date_success}
          </td>
          <td>{btnVerify}</td>
          <td>
            <EduIDButton
              className="btn-link btn-remove-webauthn"
              onClick={this.props.handleRemoveWebauthnToken}
            >
              <svg
                className="remove"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 0h2v16H7z" />
                <path d="M0 9V7h16v2z" />
              </svg>
            </EduIDButton>
          </td>
        </tr>
      );
    }, this);

    // show no table if no security keys
    if (tokens.length > 0) {
      securitykey_table = (
        <table className="passwords">
          <tbody>
            <tr>
              <th>{this.props.l10n("security.description")}</th>
              <th>{this.props.l10n("security.creation_date")}</th>
              <th>{this.props.l10n("security.last_used")}</th>
              <th />
              <th />
            </tr>
            {secirutykey_table_data}
          </tbody>
        </table>
      );
    }

    return (
      <div id="security-container">
        <div id="register-securitykey-container">
          <div className="intro">
            <h4>{this.props.l10n("security.security-key_title")}</h4>
            <p>{this.props.l10n("security.for-second-factor")}</p>
          </div>
          <div id="register-webauthn-tokens-area">
            {securitykey_table}
            <div id="add-webauthn-token">
              <EduIDButton
                id="security-webauthn-button"
                className="settings-button"
                onClick={this.props.handleStartAskingKeyWebauthnDescription}
              >
                {this.props.l10n("security.add_webauthn_token_key")}
              </EduIDButton>
            </div>
            {platformAuthenticatorButton}
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

Security.propTypes = {
  credentials: PropTypes.array,
  creation_date: PropTypes.string,
  last_used: PropTypes.string,
  langs: PropTypes.array,
  // confirming_change: PropTypes.bool,
  // deleted: PropTypes.bool,
  // handleStartConfirmationPassword: PropTypes.func,
  // handleStopConfirmationPassword: PropTypes.func,
  // handleConfirmationPassword: PropTypes.func,
  // confirming_deletion: PropTypes.bool,
  // handleStartConfirmationDeletion: PropTypes.func,
  // handleStopConfirmationDeletion: PropTypes.func,
  // handleConfirmationDeletion: PropTypes.func,
  handleStartWebauthnRegistration: PropTypes.func,
  handleCloseWebauthnModal: PropTypes.func
};

export default Security;
