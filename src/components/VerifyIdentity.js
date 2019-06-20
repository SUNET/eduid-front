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

class VerifyIdentity extends Component {
  render() {
    // const url = window.location.href;
    // let profileSection = "";

    // if (url.includes("security")) {
    //   profileSection = [<SecurityContainer />];
    // } else {
    //   if (this.props.nins.length) {
    //     profileSection = [<NinsContainer />];
    //     // if (!this.props.verifiedNin) {
    //     // } else {
    //     //   profileSection = [<NinsContainer />];
    //     // }
    //   } else {
    //     profileSection = [];
    //   }
    //   // if (!this.props.verifiedNin) {

    //   // } else {
    //   //   profileSection = [<NinsContainer />];
    //   // }
    // }

    return (
      <div id="verify-identity-prompt">
        <h3>You're almost done, the next step is to verify your identity</h3>
        <p>
          Choose a suitable way to verify your identity and follow the
          instuctions to start using eduID. You can change any of your personal
          information in Settings.
        </p>
        <div id="verify-identity-prompt-button">
          <Link
            // className="button"
            id="verify-button-prompt-link"
            to={`/profile/verify-identity/`}
          >
            <button id="verify-button-prompt" type="submit">
              I want to verify my identity
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default VerifyIdentity;

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
