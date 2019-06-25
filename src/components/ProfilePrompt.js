import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { connect } from "react-redux";

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
    const url = window.location.href;
    if (this.props.nins.length) {
      return (
        <div id="profile-card">
          <div id="verify-identity-prompt">
            <Link to={`/profile/security/`}>
              <label>Make eduID more secure</label>
              <p>
                Choose a suitable way to verify your identity and follow the
                instuctions to start using eduID.
              </p>
            </Link>
          </div>
        </div>
      );
    } else if (this.props.nins.length === 0) {
      return (
        <div id="profile-card">
          <div id="verify-identity-prompt">
            <Link
              // id="verify-identity-link"
              to={`/profile/verify-identity/`}
            >
            <label>start using eduID</label>
              <p>
                Choose a suitable way to verify your identity and follow the
                instuctions to start using eduID.
              </p>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div id="verify-identity-prompt">
          <NinDisplay />
        </div>
      );
    }
  }
}

export default ProfilePrompt;

// const mapStateToProps = (state, props) => {
//   let verifiedNin;
//   const nins = state.nins.nins.filter(nin => nin.verified);
//   if (nins.length >= 1) {
//     verifiedNin = true;
//   } else {
//     verifiedNin = false;
//   }
//   return {
//     nins: state.nins.nins, // verified nin to see where to prompt user
//     verifiedNin: verifiedNin // could be a boolean? to show what colour to display nin
//   };
// };

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//     handleThingy: function (e) {
//       console.log("do you need a function here?");
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Profile);
