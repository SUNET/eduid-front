import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import i18n from "i18n-messages";

import DashboardNav from "./DashboardNav";
import VerifyIdentityProcess from "./VerifyIdentityProcess";
import NameDisplay from "components/NameDisplay";
import NinDisplay from "components/NinDisplay";
import PhoneDisplay from "components/PhoneDisplay";
import EmailDisplay from "components/EmailDisplay";

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
      profileSection = [<VerifyIdentityProcess key="0" {...this.props} />];
    } else {
      accountDetails = [
        <NameDisplay key="0" {...this.props} />,
        <NinDisplay key="1" {...this.props} />,
        <PhoneDisplay key="2" {...this.props} />,
        <EmailDisplay key="3" {...this.props} />
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
  // proofing_methods: PropTypes.array
};

// export default Profile;
const mapStateToProps = (state, props) => {
  let verifiedNinStatus = "";
  let verifiedPhone = "";
  const nins = state.nins.nins.filter(nin => nin.verified);
  nins.length >= 1 ? (verifiedNinStatus = true) : (verifiedNinStatus = false);
  // if (nins.length >= 1) {
  //   verifiedNinStatus = true;
  // } else {
  //   verifiedNinStatus = false;
  // }
  const phones = state.phones.phones.filter(phoneNum => phoneNum.verified);
  phones.length >= 1 ? (verifiedPhone = true) : (verifiedPhone = false);
  // if (phones.length >= 1) {
  //   verifiedPhone = true;
  // } else {
  //   verifiedPhone = false;
  // }
  // const phoneNumber = state.phones.phones.filter(phone => phone.primary);
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    nins: state.nins.nins, // all nin info
    verifiedNin: nins, // all verified nin info
    verifiedNinStatus: verifiedNinStatus, // is the added nin verified?
    phones: state.phones.phones, // all phone info
    verifiedPhone: verifiedPhone,
    emails: emailAddress, // all info about primary email
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname,
    // valid_nin: isValid("nins")(state),
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default i18n(ProfileContainer);
