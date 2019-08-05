import React, { Component } from "react";
import PropTypes from "prop-types";
import DashboardNav from "./DashboardNav";
import VerifyIdentity from "containers/VerifyIdentity";
import NameDisplay from "components/NameDisplay";
import NinDisplay from "components/NinDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import EmailDisplay from "containers/EmailDisplay";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss"; //styling in DashboardMain

class Profile extends Component {
  render() {
    const url = window.location.href;
    let profileSection = ""; // determines the interactive content (if any)
    let stylingId = "profile-container"; // changes styling depending on profileSection
    let accountDetails = ""; // determines the userdetailks displayed in the profile

    // let LetterProofingDisplay = props => {
    //   if (props.letter_proofing) {
    //     return (
    //       <div key="1" className="profile-card">
    //         <label>Email Address</label>
    //         <div id="nin-number-container">
    //           <p id="nin-number" className="verified">
    //             A letter was sent to your home
    //           </p>
    //         </div>
    //       </div>
    //     );
    //   } else {
    //     return <div />;
    //   }
    // };

    //
    if (url.includes("verify-identity")) {
      stylingId = "profile-container-verifyId";
      profileSection = [<VerifyIdentity key="0" {...this.props} />];
    } else {
      accountDetails = [
        <NameDisplay key="0" />,
        <NinDisplay key="1" {...this.props} />,
        <PhoneDisplay key="2" />,
        <EmailDisplay key="3" />
        // <LetterProofingDisplay {...this.props} />,
      ];
    }

    return (
      <div key="0" id="dashboard">
        <DashboardNav {...this.props} />
        <div key="0" id={stylingId}>
          <div key="0" id="profile-section">
            {profileSection}
          </div>
          <div key="1" id="profile-detail-grid" className="profile-data">
            {accountDetails}
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default Profile;