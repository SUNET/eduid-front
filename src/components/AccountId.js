import React, { Component } from "react";
import PropTypes from "prop-types";
import "../login/styles/index.scss";

class AccountId extends Component {
  render() {
    return (
      <div>
        <div id="change-password-container">
          <div className="intro">
            <h4>{this.props.translate("accountId.main_title")}</h4>
            <p>{this.props.translate("accountId.long_description")}</p>
          </div>
          <div key="1" className="profile-card">
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                {this.props.eppn}
              </p>
            </div>
            <p className="orcid-btn-help">
              {this.props.translate("accountId.short_description")}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

AccountId.propTypes = {
  eppn: PropTypes.string
};

export default AccountId;
