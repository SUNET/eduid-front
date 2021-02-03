import React, { Component } from "react";
import { HashLink } from 'react-router-hash-link';

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
            {this.props.phones[0].number}
          </p>,
        ];
      }
    } else {
      userData = [
        <HashLink
          key="1"
          to={`/profile/settings/#phone`}
          className="display-data unverified"
        >
         {this.props.translate("profile.phone_display_no_data")}
        </HashLink>,
      ];
    }

    return (
      <div key="2" className="profile-grid-cell">
        <label key="0">
          {this.props.translate("profile.phone_display_title")}
        </label>
        {userData}
      </div>
    );
  }
}

export default PhoneDisplay;
