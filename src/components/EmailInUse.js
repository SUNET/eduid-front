import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "./EduIDButton";

import "style/EmailInUse.scss";

class EmailInUse extends Component {
  render() {
    return (
      <div id="register-container">
        <div>
          <h3 className="register-header">
            {this.props.l10n("used.email-in-use")({ email: this.props.email })}
          </h3>
          <div id="email-display">
            <p>{this.props.l10n("used.email-label")}</p>
          </div>

          <a href={this.props.reset_url}>
            <EduIDButton className="settings-button ok-button">
              {this.props.l10n("used.reset-password")}
            </EduIDButton>
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
