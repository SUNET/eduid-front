import React, { Component } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "style/base.scss";
// import "style/DashboardMain.scss";

class NameDisplay extends Component {
  render() {
    let userData = "";
    if (this.props.firstName) {
      userData = [
        <p key="0" className="display-data verified">
          {this.props.firstName} {this.props.lastName}
        </p>,
      ];
    } else {
      userData = [
        <p key="0" className="display-data no-data">
          {this.props.translate("profile.name_display_no_data")}
        </p>,
      ];
    }
    return (
      <div key="0" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("profile.name_display_title")}
        </label>
        {/* <div key="1" id="nin-number-container"> */}
        {userData}
        {/* </div> */}
      </div>
    );
  }
}

export default NameDisplay;
