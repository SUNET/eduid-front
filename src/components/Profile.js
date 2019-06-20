import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import NinsContainer from "containers/Nins";
import DashboardSecurity from "./DashboardSecurity";
import NinDisplay from "./NinDisplay";
import VerifyIdentity from "./VerifyIdentity";
import SecurityContainer from "containers/Security";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardNav from "./DashboardNav";

class Profile extends Component {
  render() {
    const url = window.location.href;
    let profileSection = "";

    if (url.includes("security")) {
      profileSection = [<SecurityContainer />];
    } else if (url.includes("verify-identity")) {
      profileSection = [<NinsContainer />];
    } else {
      if (this.props.nins.length) {
        profileSection = [<NinDisplay {...this.props} />];
      } else {
        profileSection = [<VerifyIdentity />];
      }
    }

    return (
      <div id="dashboard" className="profile">
        <DashboardNav {...this.props} />
        <div id="verify-identity-process">{profileSection}</div>
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
    verifiedNin: verifiedNin // could be a boolean? to show what colour to display nin
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleThingy: function(e) {
      console.log("do you need a function here?");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
