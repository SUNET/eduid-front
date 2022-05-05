import NotificationsContainer from "containers/Notifications";
import SplashContainer from "containers/Splash";
import { useDashboardAppSelector } from "dashboard-hooks";
import { createBrowserHistory } from "history";
import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../login/components/Footer/Footer";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import SettingsComponent from "./Settings";
import { EmailInfo } from "../apis/eduidEmail";
import VerifyIdentity from "./VerifyIdentity";
import Profile from "./Profile";

export const history = createBrowserHistory();

export function DashboardMain() {
  const emails: EmailInfo[] = useDashboardAppSelector((state) => state.emails.emails);

  let email;
  if (emails.length >= 1) {
    email = emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = "";
  }

  return (
    <React.Fragment>
      <SplashContainer key="0" />
      <Router key="1" history={history}>
        <Header email={email} showLogout={true} />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <div key="0" id="content" className="horizontal-content-margin content">
            <DashboardNav />
            <div key="0" id="text-content">
              <Route path="/profile/settings/" component={SettingsComponent} />
              <Route exact path="/profile/" component={Profile} />
              <Route path="/profile/verify-identity/" component={VerifyIdentity} />
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
