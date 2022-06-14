import NotificationsContainer from "containers/Notifications";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../login/components/Footer/Footer";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import Profile from "./Profile";
import SettingsComponent from "./Settings";
import Splash from "./Splash";
import VerifyIdentity from "./VerifyIdentity";

export function DashboardMain() {
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  let email;
  if (emails.length >= 1) {
    email = emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = "";
  }

  return (
    <React.Fragment>
      <Header email={email} showLogout={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <DashboardNav />
            <div id="text-content">
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
        </Splash>
      </section>
      <Footer />
    </React.Fragment>
  );
}
