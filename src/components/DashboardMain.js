import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

//import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";
import ChangePassword from "./ChangePassword";
import SettingsComponent from "./Settings";
import Profile from "containers/Profile";
import NotificationsContainer from "containers/Notifications";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "style/base.scss";
import "style/DashboardMain.scss";

export const history = createBrowserHistory();

class Main extends Component {
  //constructor(props) {
    //super(props);
    //this.state = {
      //fetching: props.is_fetching,
      //setFetching: this.setFetching.bind(this)
    //};
  //}

  //setFetching(fetching) {
    //this.setState({
      //fetching: fetching
    //});
  //}

  render() {
    let promptLink = ``;
    let welcomeGreeting = "";
    let styling = "unverified";
    if (this.props.nin) {
      promptLink = `/profile/verify-identity/`;
      styling = "unverified";
      welcomeGreeting = this.props.l10n("dashboard.tagline_unverified");
      if (this.props.verifiedNin) {
        promptLink = `/profile/settings/advanced-settings`;
        styling = "verified";
        welcomeGreeting = this.props.l10n("dashboard.tagline_verified");
      }
    } else {
      promptLink = `/profile/verify-identity/`;
      styling = "unverified";
      welcomeGreeting = this.props.l10n("dashboard.tagline_unverified");
    }

    // XXX <FetchingContext.Provider value={this.state}> ... </FetchingContext.Provider>
    // should wrap the splash container and router once we get back to using
    // it.
    return ([
        <SplashContainer />,
        <Router history={history}>
          <div className="dashboard-wrapper">
            <HeaderContainer {...this.props} />
            <div id="dashboard-text">
              <div id="welcome">
                <h1>
                  {this.props.l10n("dashboard.welcome")} {this.props.email}
                </h1>
                <Link id="profile-prompt-link" to={promptLink}>
                  <h2 className={styling}>{welcomeGreeting}</h2>
                </Link>
              </div>
              <div id="content">
                <NotificationsContainer />
                <Route
                  path="/profile/settings/"
                  component={SettingsComponent}
                />
                <Route
                  exact
                  path="/profile/"
                  render={props => <Profile {...props} />}
                />
                <Route
                  path="/profile/verify-identity/"
                  render={props => <Profile {...props} />}
                />
                <Route
                  exact
                  path="/profile/security/"
                  component={() => <Redirect to="/profile/settings/" />}
                />
                <Route path="/profile/chpass/" component={ChangePassword} />
              </div>
            </div>
            <FooterContainer {...this.props} />
          </div>
        </Router>
    ]);
  }
}

Main.propTypes = {
  eppn: PropTypes.string,
  messages: PropTypes.object
};

export default Main;
