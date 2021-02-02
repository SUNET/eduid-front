import React, { Component } from "react";
import { Link } from "react-router-dom";

class PhoneDisplay extends Component {
  render() {
    let userData = "";
    if (this.props.phones.length) {
      if (this.props.primaryPhoneStatus) {
        userData = [
          <p key="0" className="display-data verified">
            {this.props.primaryPhone[0].number}
          </p>,
        ];
      } else {
        userData = [
          <p key="0" className="display-data no-data">
            {this.props.translate("profile.phone_display_unconfirmed_data")}
          </p>,
        ];
      }
    } else {
      userData = [
        <Link
          key="1"
          to={`/profile/settings/`}
          className="display-data unverified"
        >
         {this.props.translate("profile.phone_display_no_data")}
        </Link>,
      ];
    }

    return (
      <div key="2" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("profile.phone_display_title")}
        </label>
        {/* <div key="1" id="nin-number-container"> */}
        {userData}
        {/* </div> */}
      </div>
    );
  }
}

export default PhoneDisplay;
