import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class EmailDisplay extends Component {
  render() {
    let text = "";
    if (this.props.email.length === 0) {
      text = [
        <p key="0" id="nin-number" className="no-data">
          {this.props.translate("profile.email_display_no_data")}
        </p>
      ];
    } else {
      text = [
        <p key="0" id="nin-number" className="verified">
          {this.props.email[0].email}
        </p>
      ];
    }
    return (
      <div key="3" className="profile-card">
        <label key="0">
          {this.props.translate("profile.email_display_title")}
        </label>
        <div key="1" id="nin-number-container">
          {text}
        </div>
      </div>
    );
  }
}

export default EmailDisplay;
