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

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";

class Profile extends Component {
  render() {
    const url = window.location.href;
    let profileSection = "";
    let stylingClass = "";

    if (url.includes("security")) {
      stylingClass = "profile";
      profileSection = [<SecurityContainer />];
    } else if (url.includes("verify-identity")) {
      stylingClass = "verify-identity";
      profileSection = [<VerifyIdentityProcess {...this.props} />];
    } else {
      if (this.props.nins.length) {
        stylingClass = "verify-identity";
        profileSection = [
            <NinDisplay {...this.props} />
        ];
      } else {
        stylingClass = "profile";
        profileSection = [<ProfilePrompt {...this.props} />];
      }
    }

    return (
      <div id="dashboard" className={stylingClass}>
        <DashboardNav {...this.props} />
        <div id="profile-grid">{profileSection}</div>
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
  return {
    nins: state.nins.nins, // verified nin to see where to prompt user
    verifiedNin: verifiedNin, // could be a boolean? to show what colour to display nin
    is_configured: state.config.is_configured,
    proofing_methods: state.config.PROOFING_METHODS,
    valid_nin: isValid("nins")(state),
    message: state.nins.message,

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
