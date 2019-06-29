import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
// import { Collapse } from "reactstrap";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import SettingsComponent from "./Settings";
import SettingsButton from "./SettingsButton";
import Profile from "./Profile";
import Nins from "./Nins";
import VerifyIdentityPrompt from "./ProfilePrompt";
// import PersonalDataContainer from "containers/PersonalData";
import DashboardNav from "./DashboardNav";
import AccountLinkingContainer from "containers/AccountLinking";
import SecurityContainer from "containers/Security";
import ChangePasswordContainer from "containers/ChangePassword";
// import EmailsContainer from "containers/Emails";
// import MobileContainer from "containers/Mobile";
// import AccountLinkingContainer from "containers/AccountLinking";
// import SecurityContainer from "containers/Security";
// import ChangePasswordContainer from "containers/ChangePassword";
import NotificationsContainer from "containers/Notifications";
// import NotificationsContainer from "components/VerifyIdentity";
// import ProfileFilledContainer from "containers/ProfileFilled";
// import PendingActionsContainer from "containers/PendingActions";
import Questions from "./Questions";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";
import DashboardSecurity from "./DashboardSecurity";

export const history = createHistory();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: props.is_fetching,
      setFetching: this.setFetching.bind(this)
    };
  }

  setFetching(fetching) {
    this.setState({
      fetching: fetching
    });
  }

  render() {
    let welcomeGreeting = "";

    if (this.props.nins) {
      welcomeGreeting = [
        <p>
          Welcome back to eduID. You can change any of your personal details in
          Settings.
        </p>
      ];
    } else {
      welcomeGreeting = [
        <p>
          Welcome to your eduID. To be able to use it you need to provide some
          more information.
        </p>
      ];
    }

    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <div className="dashboard-wrapper">
          <HeaderContainer />
          <Router history={history}>
            <div id="dashboard-container">
              <SettingsButton {...this.props} />
              <div id="dashboard-text">
                <h1>eduID for {this.props.email}</h1>
                {welcomeGreeting}
                <div id="content">
                  <NotificationsContainer />
                  <Route
                    path="/profile/settings/"
                    component={SettingsComponent}
                  />
                  <Route exact path="/profile/" component={Profile} />
                  <Route path="/profile/verify-identity/" component={Profile} />
                  <Route path="/profile/security/" component={Profile} />
                </div>
                <Questions />
              </div>
            </div>
          </Router>
        </div>
        <FooterContainer />
      </FetchingContext.Provider>
    );
  }
}

Main.propTypes = {
  eppn: PropTypes.string,
  messages: PropTypes.object
};

export default Main;
