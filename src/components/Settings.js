import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
import { Collapse } from "reactstrap";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import DashboardNav from "./DashboardNav";
import PersonalDataContainer from "containers/PersonalData";
import NinsContainer from "containers/Nins";
import EmailsContainer from "containers/Emails";
import MobileContainer from "containers/Mobile";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import PasswordChange from "components/PasswordChange";
import NotificationsContainer from "containers/Notifications";
import ProfileFilledContainer from "containers/ProfileFilled";
import PendingActionsContainer from "containers/PendingActions";
import DeleteAccount from "components/DeleteAccount";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

export const history = createHistory();

class Settings extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {
    let SideBarMenu = "";
    const url = window.location.href;
    if (url.includes("personaldata")) {
      SideBarMenu = [
        <aside>
          <section>
            <div>
              <ul id="menu-about">
                <li id="menu-item-21">
                  <a href="#">Name</a>
                </li>
                <li id="menu-item-19">
                  <a href="#">Email address</a>
                </li>
                <li id="menu-item-20">
                  <a href="#">Phone number</a>
                </li>
                <li id="menu-item-22">
                  <a href="#">Change password</a>
                </li>
                <li id="menu-item-23">
                  <a href="#">Delete account</a>
                </li>
              </ul>
            </div>
          </section>
        </aside>
      ];
    } else {
      SideBarMenu = "";
    }
    return (
      <div id="dashboard">
        <DashboardNav />
        {SideBarMenu}
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
            component={PasswordChange}
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
        </div>
      </div>
    );
  }
}

export default Settings;
