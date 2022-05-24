import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "components/EduIDButton";

class ResendCode extends Component {
  render() {
    return (
      <div id="content" className="horizontal-content-margin content">
        <h1 className="register-header">{this.props.translate("resend.link-sent")}</h1>
        <div id="email-display">
          <p>{this.props.translate("resend.email-label")}</p>
          <h4 className="register-header registered-email">{this.props.email}</h4>
        </div>

        <div className="buttons">
          <EduIDButton id="resend-button" buttonstyle="primary" onClick={this.props.handleResend}>
            {this.props.translate("resend.button")}
          </EduIDButton>
        </div>
      </div>
    );
  }
}

ResendCode.propTypes = {
  email: PropTypes.string,
};

export default ResendCode;
