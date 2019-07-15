import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "style/EmailInUse.scss";

class EmailInUse extends Component {
  render() {
    return (
      <div id="register-container">
        <div>
          <h3 className="register-header">
            {this.props.l10n("used.email-in-use")}
          </h3>
          <div id="email-display">
            <label>{this.props.l10n("used.email-label")}</label>
            <h3 className="register-header registered-email">
              {this.props.email}
            </h3>
          </div>
          <a href={this.props.reset_url} className="button">
            {this.props.l10n("used.reset-password")}
          </a>
        </div>
      </div>
    );
  }
}

EmailInUse.propTypes = {
  l10n: PropTypes.func,
  reset_url: PropTypes.string
};

export default EmailInUse;
