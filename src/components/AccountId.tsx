import React, { Component } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";

class AccountId extends Component {
  render() {
    return (
      <article id="uniqueId-container">
        <div className="intro">
          <h3>{this.props.translate("accountId.main_title")}</h3>
          <p>{this.props.translate("accountId.long_description")}</p>
        </div>
        <div key="1" className="profile-grid-cell">
          <label key="0">{this.props.translate("profile.eppn_display_title")}</label>
          <div className="display-data verified">{this.props.eppn}</div>
          <p className="help-text">{this.props.translate("accountId.short_description")}</p>
        </div>
      </article>
    );
  }
}

AccountId.propTypes = {
  eppn: PropTypes.string,
};

export default AccountId;
