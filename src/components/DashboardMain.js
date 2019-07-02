import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
import { Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import { ConnectedRouter } from "react-router-redux";
// import { Collapse } from "reactstrap";
import ProfilePrompt from "./ProfilePrompt";
import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import DashboardNav from "./DashboardNav";
import SettingsComponent from "./Settings";
import Profile from "./Profile";
import NotificationsContainer from "containers/Notifications";
import Questions from "./Questions";

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
      welcomeGreeting =
        "Welcome back to eduID. You can change any of your personal details in Settings.";
    } else {
      welcomeGreeting =
        "Welcome to your eduID. To be able to use it you need to provide some more information.";
    }

    return (
      <FetchingContext.Provider value={this.state}>
        <SplashContainer />
        <Router history={history}>
          <div className="dashboard-wrapper">
            <ProfilePrompt {...this.props} />
            <HeaderContainer />

            <div id="dashboard-container">
              {/* <SettingsButton {...this.props} /> */}
              <div id="dashboard-text">
                <div id="welcome">
                  <h1>eduID for {this.props.email}</h1>
                  <h2>{welcomeGreeting}</h2>
                </div>
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
          </div>
        </Router>

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
