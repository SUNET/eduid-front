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
import VerifyIdentity from "./VerifyIdentity";
// import PersonalDataContainer from "containers/PersonalData";
import NinsContainer from "containers/Nins";
import DashboardNav from "./DashboardNav";
// import EmailsContainer from "containers/Emails";
// import MobileContainer from "containers/Mobile";
// import AccountLinkingContainer from "containers/AccountLinking";
// import SecurityContainer from "containers/Security";
// import ChangePasswordContainer from "containers/ChangePassword";
// import NotificationsContainer from "containers/Notifications";
// import ProfileFilledContainer from "containers/ProfileFilled";
// import PendingActionsContainer from "containers/PendingActions";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

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
        <div className="container-fluid">
          <HeaderContainer />
          <Router history={history}>
            <div id="content-block">
              <SettingsButton />
              <div id="dashboard-text">
                <h1>eduID for {this.props.email}</h1>
                {welcomeGreeting}
                <div id="content">
                  <Route
                    path="/profile/settings/"
                    component={SettingsComponent}
                  />
                  {/* <DashboardNav /> */}
                  <Route exact path="/profile/" component={VerifyIdentity} />
                  <Route
                    exact
                    path="/profile/verify-identity/step1"
                    component={VerifyIdentity}
                  />
                </div>
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
