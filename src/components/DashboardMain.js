import NotificationsContainer from "containers/Notifications";
import Profile from "containers/Profile";
import SplashContainer from "containers/Splash";
import VerifyIdentity from "containers/VerifyIdentity";
import { createBrowserHistory } from "history";
import PropTypes from "prop-types";
import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../login/components/Footer/Footer";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import SettingsComponent from "./Settings";

export const history = createBrowserHistory();

function Main(props) {
  return (
    <React.Fragment>
      <SplashContainer key="0" />
      <Router key="1" history={history}>
        <a id="stable-link" className="hidden" href="/feature/no-beta">
          {props.translate("beta-link.to-stable")}
        </a>
        <Header {...props} showLogout={true} />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <div key="0" id="content" className="horizontal-content-margin content">
            <DashboardNav {...props} />
            <div key="0" id="text-content">
              <Route path="/profile/settings/" component={SettingsComponent} />
              <Route exact path="/profile/" render={(props) => <Profile {...props} />} />
              <Route path="/profile/verify-identity/" render={(props) => <VerifyIdentity {...props} />} />
              <Route path="/profile/chpass/" component={ChangePasswordContainer} />
              {/* Redirects for old paths */}
              <Route exact path="/profile/security/" component={() => <Redirect to="/profile/settings/" />} />
              <Route
                exact
                path="/profile/accountlinking/"
                component={() => <Redirect to="/profile/settings/advanced-settings/" />}
              />
              <Route exact path="/profile/nins/" component={() => <Redirect to="/profile/verify-identity/" />} />
              <Route
                exact
                path="/profile/emails/"
                component={() => <Redirect to="/profile/settings/personaldata/" />}
              />
            </div>
          </div>
        </section>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

Main.propTypes = {
  eppn: PropTypes.string,
  messages: PropTypes.object,
};

export default Main;
