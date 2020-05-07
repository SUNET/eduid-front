import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";

// import "style/ResendCode.scss";

class ResendCode extends Component {
  render() {
    return (
      <div id="register-container" className="vertical-content-margin">
        <h3 className="register-header">
          {this.props.translate("resend.link-sent")}
        </h3>
        <div id="email-display">
          <p>{this.props.translate("resend.email-label")}</p>
          <h3 className="register-header registered-email">
            {this.props.email}
          </h3>
        </div>

        <EduIDButton
          id="resend-button"
          className="settings-button"
          onClick={this.props.handleResend}
        >
          {this.props.translate("resend.button")}
        </EduIDButton>
      </div>
    );
  }
}

ResendCode.propTypes = {
  email: PropTypes.string
};

export default ResendCode;
