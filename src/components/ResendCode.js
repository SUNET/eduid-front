import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";

import "style/ResendCode.scss";

class ResendCode extends Component {
  render() {
    return (
      <div id="register-container">
        <h3 className="register-header">
          {this.props.l10n("resend.link-sent")}
        </h3>
        <div id="email-display">
          <p>{this.props.l10n("resend.email-label")}</p>
          <h3 className="register-header registered-email">
            {this.props.email}
          </h3>
        </div>

        <EduIDButton
          id="resend-button"
          className="settings-button"
          onClick={this.props.handleResend}
        >
          {this.props.l10n("resend.button")}
        </EduIDButton>
      </div>
    );
  }
}

ResendCode.propTypes = {
  email: PropTypes.string
};

export default ResendCode;
