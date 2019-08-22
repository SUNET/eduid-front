import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import EduIDButton from "components/EduIDButton";
import "style/Nins.scss";

export class NinDisplay extends Component {
  render() {
    const url = this.props.history.location.pathname;
    if (url.includes("verify-identity")) {
      if (this.props.verifiedNinStatus) {
        return (
          <div key="1" className="profile-card">
            <label key="0">
              {this.props.l10n(
                "nin_display.verify-identity_verified_main_title"
              )}
            </label>
            <div key="1" data-ninnumber={this.props.verifiedNin[0].number}>
              <p key="0" id="nin-number" className="verified">
                {this.props.verifiedNin[0].number}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key="1" className="profile-card">
            <label key="0">
              {this.props.l10n(
                "nin_display.verify-identity_unverified_main_title"
              )}
            </label>
            <div key="1" id="nin-display-container">
              <div
                key="0"
                data-ninnumber={this.props.nins[0].number}
                id="nin-number-container"
              >
                <p key="1" id="nin-number" className="unverified">
                  {this.props.nins[0].number}
                </p>
                <EduIDButton
                  key="2"
                  className="icon-button"
                  onClick={this.props.handleDelete}
                >
                  <svg
                    key="0"
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
              </div>
            </div>
          </div>
        );
      }
    } else {
      if (this.props.nins.length === 0) {
        return (
          <div key="1" className="profile-card">
            <label key="0">
              {this.props.l10n("nin_display.profile.main_title")}
            </label>
            <div key="1" id="nin-number-container">
              <Link
                to={`/profile/verify-identity/`}
                className="unverified profile-data"
              >
                {this.props.l10n("nin_display.profile.no_nin")}
              </Link>
            </div>
          </div>
        );
      } else {
        if (this.props.verifiedNinStatus) {
          return (
            <div key="1" className="profile-card">
              <label key="0">
                {this.props.l10n("nin_display.profile.main_title")}
              </label>
              <div key="1" data-ninnumber={this.props.verifiedNin[0].number}>
                <p key="0" id="nin-number" className="verified">
                  {this.props.verifiedNin[0].number}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key="1" className="profile-card">
            <label key="0">
              {this.props.l10n("nin_display.profile.main_title")}
            </label>
            <div key="1" id="nin-number" id="nin-number-container">
              <Link
                key="2"
                to={`/profile/verify-identity/`}
                id="nin-number"
                className="unverified profile-data"
              >
                {this.props.nins[0].number}
              </Link>
            </div>
          </div>
        );
      }
    }
  }
}

NinDisplay.propTypes = {
  nins: PropTypes.array,
  verifiedNin: PropTypes.array,
  verifiedNinStatus: PropTypes.bool,
  handleDelete: PropTypes.func
};

export default withRouter(NinDisplay);
