import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class NameDisplay extends Component {
  render() {
    let text = "";
    if (this.props.firstName) {
      text = [
        <p key="0" id="nin-number" className="verified">
          {this.props.firstName} {this.props.lastName}
        </p>
      ];
    } else {
      text = [
        <p key="0" id="nin-number" className="no-data">
          {this.props.l10n("profile.name_display_no_data")}
        </p>
      ];
    }
    return (
      <div key="0" className="profile-card">
        <label key="0">{this.props.l10n("profile.name_display_title")}</label>
        <div key="1" id="nin-number-container">
          {text}
        </div>
      </div>
    );
  }
}

export default NameDisplay;

