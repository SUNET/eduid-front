import React, { Component } from "react";

class EmailDisplay extends Component {
  render() {
    console.log("these are props in email display:", this.props);
    let displayText = "";
    if (this.props.email.length) {
      displayText = [
        <p key="0" className="verified data">
          {this.props.email}
        </p>
      ];
    } else {
      displayText = [
        <p key="0" className="no-data data">
          {this.props.l10n("profile.email_display_no_data")}
        </p>
      ];
    }
    return (
      <div key="3" className="email-display-container">
        <label key="0">{this.props.l10n("profile.email_display_title")}</label>
        <div className="email-display">{displayText}</div>
      </div>
    );
  }
}

export default EmailDisplay;
