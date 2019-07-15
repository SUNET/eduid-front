import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "style/AccountCreated.scss";

class AccountCreated extends Component {
  render() {
    return (
      <div id="register-container">
        <h3 className="register-header">
          {this.props.l10n("created.account-created")}
        </h3>
        <div id="email-display">
          <label>{this.props.l10n("created.email-label")}</label>
          <h3 className="register-header registered-email">
            {this.props.email}
          </h3>
        </div>
      </div>
    );
  }
}

AccountCreated.propTypes = {
  email: PropTypes.string
};

export default AccountCreated;
