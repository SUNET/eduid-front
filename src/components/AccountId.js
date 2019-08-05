import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import i18n from "i18n-messages";
import "style/Security.scss";

class AccountId extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>{this.props.l10n("accountId.main_title")}</h4>
            <p>{this.props.l10n("accountId.long_description")}</p>
          </div>
          <div key="1" className="profile-card">
            <label>
              {this.props.l10n("accountId.accountId_display_title")}
            </label>
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                {this.props.eppn}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AccountId.propTypes = {
  eppn: PropTypes.string,
};

export default AccountId;

