import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, NavLink, Redirect } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from "history";
import i18n from "i18n-messages";
// import { ConnectedRouter } from "react-router-redux";
// import { Collapse } from "reactstrap";

// import FetchingContext from "components/FetchingContext";
// import SplashContainer from "containers/Splash";
// import HeaderContainer from "containers/Header";
// import FooterContainer from "containers/Footer";
import ChangePasswordDisplay from "containers/ChangePasswordDisplay";
import DashboardNav from "./DashboardNav";
import PersonalDataContainer from "containers/PersonalData";
// import NinsContainer from "containers/Nins";
import EmailsContainer from "containers/Emails";
import MobileContainer from "containers/Mobile";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
// import ChangePasswordDisplay from "./ChangePasswordDisplay";
import DeleteAccount from "containers/DeleteAccount";
import AccountId from "containers/AccountId";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

class Settings extends Component {
  render() {
    // let SideBarMenu = "";
    // const url = window.location.href;
    // if (url.includes("personaldata")) {
    //   SideBarMenu = [
    //     <aside>
    //       <section>
    //         <div>
    //           <ul id="menu-about">
    //             <li id="menu-item-21">
    //               <a href="#">Name</a>
    //             </li>
    //             <li id="menu-item-19">
    //               <a href="#">Email address</a>
    //             </li>
    //             <li id="menu-item-20">
    //               <a href="#">Phone number</a>
    //             </li>
    //             <li id="menu-item-22">
    //               <a href="#">Change password</a>
    //             </li>
    //             <li id="menu-item-23">
    //               <a href="#">Delete account</a>
    //             </li>
    //           </ul>
    //         </div>
    //       </section>
    //     </aside>
    //   ];
    // } else {
    //   SideBarMenu = "";
    // }
    return (
      <div id="dashboard">
        <DashboardNav {...this.props} />
        {/* {SideBarMenu} */}
        <div id="settings-content">
          <Route
            exact
            path="/profile/settings/"
            component={() => <Redirect to="/profile/settings/personaldata" />}
          />
          <Route
            path="/profile/settings/personaldata"
            component={PersonalDataContainer}
          />

          <Route
            path="/profile/settings/personaldata"
            component={EmailsContainer}
          />
          <Route
            path="/profile/settings/personaldata"
            component={MobileContainer}
          />
          <Route
            path="/profile/settings/personaldata"
            component={ChangePasswordDisplay}
          />
          <Route
            path="/profile/settings/personaldata"
            component={DeleteAccount}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={SecurityContainer}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={AccountLinkingContainer}
          />
          <Route
            path="/profile/settings/advanced-settings"
            component={AccountId}
          />
        </div>
      </div>
    );
  }
}

// export default Settings;
const mapStateToProps = (state, props) => {
  return {};
};

const mapDispatchToProps = (dispatch, props) => {
  return {};
};

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default i18n(SettingsContainer);
