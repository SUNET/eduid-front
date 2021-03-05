import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <Link
          key="1"
          to={`/profile/settings/`}
          className="display-data unverified"
        >
          {this.props.translate("profile.name_display_no_data")}
        </Link>,
      ];
    }
    return (
      <div key="0" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("profile.name_display_title")}
        </label>
        {userData}
      </div>
    );
  }
}

export default NameDisplay;
