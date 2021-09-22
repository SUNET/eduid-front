import React, { Component } from "react";
import PropTypes from "prop-types";

class AccountCreated extends Component {
  render() {
    return (
      <div id="content" className="horizontal-content-margin">
        <h3 className="register-header">
          {this.props.translate("created.account-created")}
        </h3>
        <div id="email-display">
          <p>{this.props.translate("created.email-label")}</p>
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
