import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import i18n from "i18n-messages";
import { isValid } from "redux-form";
import * as actions from "actions/Nins";
import NinsContainer from "containers/Nins";
import DashboardSecurity from "./DashboardSecurity";
import SecurityContainer from "containers/Security";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";
import NinDisplay from "./NinDisplay";

class ProfilePrompt extends Component {
  render() {
    // const url = window.location.href;
    if (this.props.nins.length === 0) {
      return (
        <Link
          id="profile-prompt-link"
          className="verify-identity-prompt"
          to={`/profile/verify-identity/`}
        >
          <div id="profile-prompt" className="verify-identity-prompt">
            <h3 className="verify-identity-prompt">Start using eduID</h3>
            <p>
              Add your national id number and choose a suitable way to confirm
              that it belongs to you.
            </p>
          </div>
        </Link>
      );
    } else {
      if (this.props.nins[0].verified) {
        return (
          <Link
            id="profile-prompt-link"
            className="verify-identity-prompt"
            to={`/profile/security/`}
          >
            <div id="profile-prompt" className="verify-identity-prompt">
              <h3 className="verify-identity-prompt">Make eduID more secure</h3>
              <p>
                Choose a suitable way to verify your identity and follow the
                instructions to start using eduID.
              </p>
            </div>
          </Link>
        );
      } else {
        return (
          <Link
            id="profile-prompt-link"
            className="verify-identity-prompt"
            to={`/profile/verify-identity/`}
          >
            <div id="profile-prompt" className="verify-identity-prompt">
              <h3 className="verify-identity-prompt">
                Don't forget to verify you id number
              </h3>
              <p>
                Your national id number has been added, but you still need to
                verify that it is yours.
              </p>
            </div>
          </Link>
        );
      }
    }
  }
}

// export default ProfilePrompt;


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
    handleThingy: function (e) {
      console.log("do you need a function here?");
    }
  };
};

const ProfilePropmptContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfilePrompt);

export default i18n(ProfilePropmptContainer);