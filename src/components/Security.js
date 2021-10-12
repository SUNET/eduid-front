import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";
import NotificationModal from "../login/components/Modals/NotificationModal";
import ConfirmModal from "../login/components/Modals/ConfirmModalContainer";
import { securityKeyPattern } from "../login/app_utils/validation/regexPatterns";
import "../login/styles/index.scss";
import { Spinner } from "spin.js";
import { spinnerOpts } from "../components/Splash";

/*global PublicKeyCredential*/
class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlatformAuthenticatorAvailable : false,
      isPlatformAuthLoaded: false
    }
  }

  componentDidMount() {
    this.checkWebauthnDevice();
    if (!this.state.isPlatformAuthLoaded) {
      // Spinner will be running until state.isPlatformAuthLoaded is updated to true
      const splash = this.refs.eduidSplash;
      const spinner = new Spinner(spinnerOpts).spin();
      splash.appendChild(spinner.el);
    }
  }

  checkWebauthnDevice(){
    let platform = false;
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then((available) => {
          platform = available
        })
        .catch((err) => {
          console.log(err, "Couldn't detect presence of a webauthn platform authenticator.")
        })
        .finally(()=> {
          this.setState(() => {
            return {
              isPlatformAuthenticatorAvailable : platform,
              // Spinner will be stop when state.isPlatformAuthLoaded is updated to true
              isPlatformAuthLoaded: true
            }
        })
      })
    }
  }

  render() {
    let btnVerify = "";
    let date_success = "";
    let securitykey_table = "";
    // filter out password from data
    const tokens = this.props.credentials.filter(
      (cred) => cred.credential_type !== "security.password_credential_type"
    );

    // data that goes onto the table
    const securitykey_table_data = tokens.map((cred, index) => {
      // date created
      const date_created = cred.created_ts.slice(0, "YYYY-MM-DD".length);
      // date last used
      if (cred.success_ts) {
        date_success = cred.success_ts.slice(0, "YYYY-MM-DD".length);
      } else {
        date_success = this.props.translate("security.last-used.date");
      }

      // verify button/ verified badge
      if (cred.verified) {
        btnVerify = (
          <label className="nobutton verified" disabled>
            {this.props.translate("security.verified")}
          </label>
        );
      } else {
        btnVerify = (
          <EduIDButton
            className="btn-link nobutton verify-status-label"
            onClick={this.props.handleVerifyWebauthnToken}
          >
            {this.props.translate("security.verify")}
          </EduIDButton>
        );
      }

      return (
        <tr key={index} className={`webauthn-token-holder ${cred.verified ? "verified" : ""}`} data-token={cred.key}>
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
        <table className="table-form passwords">
          <tbody>
            <tr>
              <th className="security-name">{this.props.translate("security.description")}</th>
              <th className="security-creation-date">{this.props.translate("security.creation_date")}</th>
              <th className="security-last-used-date">{this.props.translate("security.last_used")}</th>
              <th className="security-verify-link" />
              <th className="security-remove-data"/>
            </tr>
            {securitykey_table_data}
          </tbody>
        </table>
      );
    }

    return (
      <div id="security-container">
       {!this.state.isPlatformAuthLoaded && <div ref="eduidSplash" id="eduid-splash-screen" />} 
        <div id="register-securitykey-container">
          <div className="intro">
            <h4>{this.props.translate("security.security-key_title")}</h4>
            <p>{this.props.translate("security.second-factor")}</p>
          </div>
          <div id="register-webauthn-tokens-area" className="table-responsive">
            {securitykey_table}
            <div className="register-authn-buttons">
            { this.state.isPlatformAuthenticatorAvailable ?
              <EduIDButton
                id="security-webauthn-platform-button"
                onClick={this.props.handleStartAskingDeviceWebauthnDescription}
              >
                {this.props.translate("security.add_webauthn_token_device")}
              </EduIDButton> : null
            }
              <button
                id="security-webauthn-button"
                className={this.state.isPlatformAuthenticatorAvailable ? "second-option" : "btn-primary"}
                onClick={this.props.handleStartAskingKeyWebauthnDescription}
              >
                {this.props.translate("security.add_webauthn_token_key")}
              </button>
            </div>
          </div>
        </div>

        <NotificationModal
          modalId="securityConfirmDialog"
          title={this.props.translate("security.confirm_title_chpass")}
          mainText={this.props.translate("security.change_info")}
          showModal={this.props.confirming_change}
          closeModal={this.props.handleStopConfirmationPassword}
          acceptModal={this.props.handleConfirmationPassword}
        />

        <ConfirmModal
          modalId="describeWebauthnTokenDialog"
          id="describeWebauthnTokenDialogControl"
          title={this.props.translate("security.webauthn-describe-title")}
          resendLabel={this.props.translate("security.webauthn_credential_type")}
          placeholder={this.props.translate("security.placeholder")}
          with_resend_link={false}
          showModal={Boolean(this.props.webauthn_asking_description)}
          closeModal={this.props.handleStopAskingWebauthnDescription}
          handleConfirm={this.props.handleStartWebauthnRegistration}
          helpBlock={this.props.translate("security.help_text")}
          validationPattern={securityKeyPattern}
          validationError={"security.description_invalid_format"}
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
  handleStartWebauthnRegistration: PropTypes.func,
  handleCloseWebauthnModal: PropTypes.func,
};

export default Security;
