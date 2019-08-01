import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class PhoneDisplay extends Component {
  render() {
    let text = "";
    if (this.props.phones.length) {
      if (this.props.verifiedPhone) {
        text = [
          <p key="0" id="nin-number" className="verified">
            {this.props.phones[0].number}
          </p>
        ];
      }
      text = [
        <p key="0" id="nin-number" className="no-data">
          {this.props.l10n("profile.phone_display_unconfirmed_data")}
        </p>
      ];
    } else {
      text = [
        <p key="0" id="nin-number" className="no-data">
          {this.props.l10n("profile.phone_display_no_data")}
        </p>
      ];
    }
    return (
      <div key="2" className="profile-card">
        <label key="0">{this.props.l10n("profile.phone_display_title")}</label>
        <div key="1" id="nin-number-container">
          {text}
        </div>
      </div>
    );
  }
}

export default PhoneDisplay;
