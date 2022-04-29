import React, { Component } from "react";
import PropTypes from "prop-types";

class AccountCreated extends Component {
  render() {
    return (
      <div id="content" className="horizontal-content-margin content">
        <h1 className="register-header">{this.props.translate("created.account-created")}</h1>
        <div id="email-display">
          <p className="preamble">{this.props.translate("created.email-label")}</p>
          <h4 className="register-header registered-email">{this.props.email}</h4>
        </div>
      </div>
    );
  }
}

AccountCreated.propTypes = {
  email: PropTypes.string,
};

export default AccountCreated;
