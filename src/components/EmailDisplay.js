import React, { Component } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "style/base.scss";
// import "style/DashboardMain.scss";

class EmailDisplay extends Component {
  render() {
    let userData = "";
    if (this.props.email.length === 0) {
      userData = [
        <p key="0" className="display-data no-data">
          {this.props.translate("profile.email_display_no_data")}
        </p>,
      ];
    } else {
      userData = [
        <p key="0" className="display-data verified">
          {this.props.email[0].email}
        </p>,
      ];
    }
    return (
      <div key="3" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("profile.email_display_title")}
        </label>
        {/* <div key="1" id="nin-number-container"> */}
        {userData}
        {/* </div> */}
      </div>
    );
  }
}

export default EmailDisplay;
