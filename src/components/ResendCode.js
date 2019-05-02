import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import EduIDButton from "components/EduIDButton";

import "style/ResendCode.scss";

class ResendCode extends Component {
  render() {
    return (
      <div className="text-center">
        <h1>{this.props.l10n("resend.title")}</h1>
        <p className="lead">{this.props.l10n("resend.subtitle")}</p>
        <EduIDButton id="resend-button" onClick={this.props.handleResend}>
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
