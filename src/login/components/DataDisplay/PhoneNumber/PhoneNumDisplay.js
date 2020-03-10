import React, { Component } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "style/base.scss";
// import "style/DashboardMain.scss";

class PhoneNumDisplay extends Component {
  render() {
    let displayText = "";
    // if (this.props.phones.length) {
    if (this.props.primaryPhoneStatus) {
      displayText = [
        <p key="0" className="verified data">
          {this.props.primaryPhone[0]}
        </p>
      ];
    } else {
      displayText = [
        <p key="0" className="unverified data">
          {this.props.translate("profile.phone_display_unconfirmed_data")}
        </p>
      ];
    }
    // } else {
    //   displayText = [
    //     <p key="0" className="no-data data">
    //       {this.props.translate("profile.phone_display_no_data")}
    //     </p>
    //   ];
    // }

    return (
      <div key="3" className="data-display-container">
        <label key="0">
          {this.props.translate("profile.phone_display_title")}
        </label>
        <div className="data-display">{displayText}</div>
      </div>
    );
  }
}

export default PhoneNumDisplay;
