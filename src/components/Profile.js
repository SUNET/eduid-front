import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import { isValid } from "redux-form";
import * as actions from "actions/Nins";
import NinsContainer from "containers/Nins";
import DashboardSecurity from "./DashboardSecurity";
import NinDisplay from "./NinDisplay";
import ProfilePrompt from "./ProfilePrompt";
import SecurityContainer from "containers/Security";
import VerifyIdentityProcess from "./VerifyIdentityProcess";
import PersonalData from "containers/PersonalData";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";
import AddNin from "./AddNin";

class Profile extends Component {
  // this component is repsonsible for rendering a summary of user info
  // (it also acts as a prompt for the user to fill in info)
  render() {
    const url = window.location.href;
    let profileSection = ""; // determines the interactive content (if any)
    let stylingClass = ""; // changes styling depending on profileSection
    let accountDetails = ""; // determines the userdetailks displayed in the profile
    let ninHelper = ""; // determines what the helper box says

    let NameDisplay = props => {
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
              <p id="nin-number" className="verified">
                No name added yet
              </p>
            </div>
          </div>
        );
      }
    };

    let PhoneDisplay = props => {
      if (props.phones.length) {
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
      } else {
        return (
          <div key="1" className="profile-card">
            <label>Phone number</label>
            <div id="nin-number-container">
              <p id="nin-number" className="verified">
                No phone number added yet
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
              <p id="nin-number" className="verified">
                No email added yet
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

    if (url.includes("security")) {
      stylingClass = "profile";
      profileSection = [<SecurityContainer />];
    } else if (url.includes("verify-identity")) {
      stylingClass = "verify-identity";
      profileSection = [<VerifyIdentityProcess {...this.props} />];
      ninHelper = [
        <p className="nin-helper">
          Your number can be used to connect eduID to your person.
        </p>
      ];
    } else {
      // if (this.props.nins.length) {
      //   stylingClass = "verify-identity";
      //   profileSection = [<NinDisplay {...this.props} />];
      // } else {
      stylingClass = "profile";
      profileSection = [<ProfilePrompt {...this.props} />];
      accountDetails = [
        <NameDisplay {...this.props} />,
        <NinDisplay {...this.props} />,
        <LetterProofingDisplay {...this.props} />,
        <PhoneDisplay {...this.props} />,
        <EmailDisplay {...this.props} />
        // <LetterProofingDisplay {...this.props} />,
      ];
      // }
    }

    return (
      <div id="dashboard" className={stylingClass}>
        <DashboardNav {...this.props} />
        <div id="profile-grid">
          <div id="profile-section">{profileSection}</div>
          <div id="nin-helper">{ninHelper}</div>
          <div id="account-detail-grid">{accountDetails}</div>
        </div>
      </div>
    );
  }
}

// export default VerifyIdentity;
const mapStateToProps = (state, props) => {
  let verifiedNin;
  const nins = state.nins.nins.filter(nin => nin.verified);
  if (nins.length >= 1) {
    verifiedNin = true;
  } else {
    verifiedNin = false;
  }
  const phoneNumber = state.phones.phones.filter(phone => phone.primary);
  const emailAddress = state.emails.emails.filter(email => email.primary);
  return {
    nins: state.nins.nins, // verified nin to see where to prompt user
    verifiedNin: verifiedNin, // could be a boolean? to show what colour to display nin
    phones: phoneNumber,
    emails: emailAddress,
    letter_verification: state.letter_proofing.confirmingLetter,
    is_configured: state.config.is_configured,
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
