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

import PersonalDataContainer from "containers/PersonalData";
import NinsContainer from "containers/Nins";
import EmailsContainer from "containers/Emails";
import MobileContainer from "containers/Mobile";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import ChangePasswordContainer from "containers/ChangePassword";
import NotificationsContainer from "containers/Notifications";
import ProfileFilledContainer from "containers/ProfileFilled";
import PendingActionsContainer from "containers/PendingActions";

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
    return (
      <div id="settings">
        <NotificationsContainer />

        <nav id="settings-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                // id="settings-personal-info"
                to={`/profile/settings/personaldata`}
              >
                <h5>Personal information</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-emails"
                to={`/profile/settings/emails`}
              >
                <h5>Email address</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-phone"
                to={`/profile/settings/phones`}
              >
                <h5>Phone</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-nin"
                to={`/profile/settings/nins`}
              >
                <h5>National identity number</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-account-linking"
                to={`/profile/settings/accountlinking`}
              >
                <h5>Account linking</h5>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                id="settings-security"
                to={`/profile/settings/security`}
              >
                <h5>Add Security</h5>
              </NavLink>
            </li>
          </ul>
        </nav>

        <Route
          exact
          path="/profile/settings/"
          component={() => <Redirect to="/profile/settings/personaldata" />}
        />
        <Route
          path="/profile/settings/personaldata"
          component={PersonalDataContainer}
        />
        <Route path="/profile/settings/nins" component={NinsContainer} />
        <Route path="/profile/settings/emails" component={EmailsContainer} />
        <Route path="/profile/settings/phones" component={MobileContainer} />
        <Route
          path="/profile/settings/accountlinking"
          component={AccountLinkingContainer}
        />
        <Route
          path="/profile/settings/security"
          component={SecurityContainer}
        />
        <Route
          path="/profile/settings/chpass"
          component={ChangePasswordContainer}
        />
      </div>
    );
  }
}

export default Settings;
