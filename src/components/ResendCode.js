import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
          <label>{this.props.l10n("resend.email-label")}</label>
          {this.props.l10n("created.email-sent")({ email: this.props.email })}
          <h3 className="register-header registered-email">
            {this.props.email}
          </h3>
        </div>

        <EduIDButton
          id="resend-button"
          className="btn-link"
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
