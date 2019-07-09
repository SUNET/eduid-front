import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import { isValid } from "redux-form";
// import * as actions from "actions/Nins";
// import NinsContainer from "containers/Nins";
// import DashboardSecurity from "./DashboardSecurity";
import NinDisplay from "./NinDisplay";
// import ProfilePrompt from "./ProfilePrompt";
import SecurityContainer from "containers/Security";
import VerifyIdentityProcess from "./VerifyIdentityProcess";
// import PersonalData from "containers/PersonalData";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss"; //styling in DashboardMain
import DashboardNav from "./DashboardNav";
// import AddNin from "./AddNin";

class Profile extends Component {
  // this component is repsonsible for rendering a summary of user info
  // (it also acts as a prompt for the user to fill in info)
  render() {
    const url = window.location.href;
    let profileSection = ""; // determines the interactive content (if any)
    let stylingId = "profile-container"; // changes styling depending on profileSection
    let accountDetails = ""; // determines the userdetailks displayed in the profile
    let ninHelper = ""; // determines what the helper box says

    // the below are the small data displays on the profile page (they render cases whener there is data or not)
    let NameDisplay = props => {
      console.log();
      if (props.firstName) {
        return (
          <div key="1" className="profile-card">
            <label>Name</label>
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                {props.firstName} {props.lastName}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key="1" className="profile-card">
            <label>Name</label>
            <div id="nin-number-container">
              <p id="nin-number" className="no-data">
                No name added
              </p>
            </div>
          </div>
        );
      }
    };

    let PhoneDisplay = props => {
      if (props.phones.length) {
        if (props.verifiedPhone) {
          return (
            <div key="1" className="profile-card">
              <label>Phone number</label>
              <div id="nin-number-container">
                <p id="nin-number" className="verified">
                  {props.phones[0].number}
                </p>
              </div>
            </div>
          );
        }
        return (
          <div key="1" className="profile-card">
            <label>Phone number</label>
            <div id="nin-number-container">
              <p id="nin-number" className="no-data">
                Verify added number
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key="1" className="profile-card">
            <label>Phone number</label>
            <div id="nin-number-container">
              <p id="nin-number" className="no-data">
                No phone number added
              </p>
            </div>
          </div>
        );
      }
    };

    let EmailDisplay = props => {
      if (props.emails.length) {
        return (
          <div key="1" className="profile-card">
            <label>Email Address</label>
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                {props.emails[0].email}
              </p>
            </div>
          </div>
        );
      } else {
        return (
          <div key="1" className="profile-card">
            <label>Email Address</label>
            <div id="nin-number-container">
              <p id="nin-number" className="no-data">
                No email added
              </p>
            </div>
          </div>
        );
      }
    };

    let LetterProofingDisplay = props => {
      if (props.letter_proofing) {
        return (
          <div key="1" className="profile-card">
            <label>Email Address</label>
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                A letter was sent to your home
              </p>
            </div>
          </div>
        );
      } else {
        return <div />;
      }
    };

    //
    if (url.includes("security")) {
      profileSection = [<SecurityContainer />];
    } else if (url.includes("verify-identity")) {
      stylingId = "profile-container-verifyId";
      profileSection = [<VerifyIdentityProcess {...this.props} />];
    } else {
      // profileSection = [<ProfilePrompt {...this.props} />];
      accountDetails = [
        <NameDisplay {...this.props} />,
        <NinDisplay {...this.props} />,
        // <LetterProofingDisplay {...this.props} />,
        <PhoneDisplay {...this.props} />,
        <EmailDisplay {...this.props} />
        // <LetterProofingDisplay {...this.props} />,
      ];
      // }
    }

    return (
      <div id="dashboard">
        <DashboardNav {...this.props} />
        <div id={stylingId}>
          <div id="profile-section">{profileSection}</div>
          <div id="profile-detail-grid" className="profile-data">
            {accountDetails}
          </div>
        </div>
      </div>
    );
  }
}

// export default VerifyIdentity;
const mapStateToProps = (state, props) => {
  let verifiedNinStatus = "";
  let verifiedPhone = "";
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    verifiedNinStatus = true;
  } else {
    verifiedNinStatus = false;
  }
  const phones = state.phones.phones.filter(phoneNum => phoneNum.verified);
  if (phones.length >= 1) {
    verifiedPhone = true;
  } else {
    verifiedPhone = false;
  }
  const phoneNumber = state.phones.phones.filter(phone => phone.primary);
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    is_configured: state.config.is_configured,
    // data: state.personal_data.data,
    nins: state.nins.nins, // all nin info
    verifiedNin: nins, // all verified nin info
    verifiedNinStatus: verifiedNinStatus, // is the added nin verified?
    phones: state.phones.phones, // all phone info
    // primaryPhoneNum: phoneNumber, // all info about primary number
    // phoneNum: state.phones.phone, // has an unverified phone number been added?
    // verifiedPhone: phones,
    verifiedPhone: verifiedPhone,
    emails: emailAddress, // all info about primary email
    letter_verification: state.letter_proofing.confirmingLetter,
    firstName: state.personal_data.data.given_name,
    lastName: state.personal_data.data.surname,
    proofing_methods: state.config.PROOFING_METHODS,
    valid_nin: isValid("nins")(state),
    message: state.nins.message
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleThingy: function(e) {
      console.log("do you need a function here?");
    }
  };
};

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default i18n(ProfileContainer);
