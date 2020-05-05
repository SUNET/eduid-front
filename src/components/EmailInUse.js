import React, { Component } from "react";
import PropTypes from "prop-types";
import EduIDButton from "./EduIDButton";

import "style/EmailInUse.scss";

class EmailInUse extends Component {
  render() {
    return (
      <div id="register-container" className="vertical-content-margin">
        <div>
          <h3 className="register-header">
            {this.props.translate("used.email-in-use")({
              email: this.props.email
            })}
          </h3>
          <div id="email-display">
            <p>{this.props.translate("used.email-label")}</p>
          </div>

          <a href={this.props.reset_url}>
            <EduIDButton className="settings-button ok-button">
              {this.props.translate("used.reset-password")}
            </EduIDButton>
          </a>
        </div>
      </div>
    );
  }
}

EmailInUse.propTypes = {
  translate: PropTypes.func,
  reset_url: PropTypes.string
};

export default EmailInUse;
