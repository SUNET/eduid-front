import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route, Link, NavLink, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

//import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";
import ChangePasswordContainer from "containers/ChangePassword";
import SettingsComponent from "./Settings";
import DashboardNav from "./DashboardNav";
import VerifyIdentity from "containers/VerifyIdentity";
import Profile from "containers/Profile";
import NotificationsContainer from "containers/Notifications";

import "../login/styles/index.scss";

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
    // XXX <FetchingContext.Provider value={this.state}> ... </FetchingContext.Provider>
    // should wrap the splash container and router once we get back to using
    // it.
    return [
      <SplashContainer key="0" />,
      <Router key="1" history={history}>
        <a id="stable-link" className="hidden" href="/feature/no-beta">
          {this.props.translate("beta-link.to-stable")}
        </a>
        <HeaderContainer {...this.props} />
        <section id="panel">
          <NotificationsContainer />
          <div key="0" id="content" className="vertical-content-margin">
            <DashboardNav {...this.props} />
            <div key="0" id="text-content">
              <Route
                path="/profile/settings/"
                component={SettingsComponent}
              />
              <Route
                exact
                path="/profile/"
                render={(props) => <Profile {...props} />}
              />
              <Route
                path="/profile/verify-identity/"
                render={(props) => <VerifyIdentity {...props} />}
              />
              <Route
                path="/profile/chpass/"
                component={ChangePasswordContainer}
              />
              {/* Redirects for old paths */}
              <Route
                exact
                path="/profile/security/"
                component={() => <Redirect to="/profile/settings/" />}
              />
              <Route
                exact
                path="/profile/accountlinking/"
                component={() => (
                  <Redirect to="/profile/settings/advanced-settings/" />
                )}
              />
              <Route
                exact
                path="/profile/nins/"
                component={() => (
                  <Redirect to="/profile/verify-identity/" />
                )}
              />
              <Route
                exact
                path="/profile/emails/"
                component={() => (
                  <Redirect to="/profile/settings/personaldata/" />
                )}
              />
              </div>
            </div>
          </section>
        <FooterContainer {...this.props} /> 
      </Router>,
    ];
  }
}

Main.propTypes = {
  eppn: PropTypes.string,
  messages: PropTypes.object,
};

export default Main;
