import React, { Component } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";

class AccountId extends Component {
  render() {
    return (
      <div>
        <div id="uniqueId-container">
          <div className="intro">
            <h4>{this.props.translate("accountId.main_title")}</h4>
            <p>{this.props.translate("accountId.long_description")}</p>
          </div>
          <div key="1" className="profile-grid-cell">
            <label key="0">
              {this.props.translate("profile.eppn_display_title")}
            </label>
            <p className="display-data verified">{this.props.eppn}</p>
            <p className="help-text">
              {this.props.translate("accountId.short_description")}
            </p>
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
