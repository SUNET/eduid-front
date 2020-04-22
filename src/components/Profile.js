import React, { Component } from "react";
import PropTypes from "prop-types";
import DashboardNav from "./DashboardNav";
import VerifyIdentity from "containers/VerifyIdentity";
import NameDisplay from "containers/NameDisplay";
import NinDisplay from "containers/NinDisplay";
import PhoneDisplay from "containers/PhoneDisplay";
import EmailDisplay from "containers/EmailDisplay";
import { withRouter } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class Profile extends Component {
  render() {
    const url = this.props.history.location.pathname;
    let profileSection = "";
    // let stylingClass = "vertical-content-margin";
    let accountDetails = "";

    if (url.includes("verify-identity")) {
      // stylingClass = "profile-container-verifyId";
      profileSection = [<VerifyIdentity key="0" {...this.props} />];
    } else {
      accountDetails = [
        <NameDisplay key="0" />,
        <NinDisplay key="1" {...this.props} />,
        <PhoneDisplay key="2" />,
        <EmailDisplay key="3" />,
      ];
    }

    return (
      <div key="0" className="vertical-content-margin">
        <DashboardNav {...this.props} />
        {/* <div key="0" className={stylingClass}> */}
        {/* <div key="0"> */}
        <div key="0" id="text-content">
          {profileSection}
        </div>
        <div key="1" id="profile-detail-grid" className="profile-data">
          {accountDetails}
        </div>
      </div>
      // </div>
    );
  }
}

Profile.propTypes = {
  nin: PropTypes.string,
  nins: PropTypes.array,
  validateNin: PropTypes.func,
  handleDelete: PropTypes.func,
};

export default withRouter(Profile);
