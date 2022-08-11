import NotificationsContainer from "containers/Notifications";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { CompatRoute as Route } from "react-router-dom-v5-compat";
import Header from "../components/Header";
import Footer from "../login/components/Footer/Footer";
import { AdvancedSettings } from "./AdvancedSettings";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import Profile from "./Profile";
import { Settings } from "./Settings";
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
    <React.StrictMode>
      <Header email={email} showLogout={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <DashboardNav />
            <div id="text-content">
              <Switch>
                <Route
                  exact
                  path="/profile/settings/"
                  component={() => <Redirect to="/profile/settings/personaldata" />}
                />
                <Route path="/profile/settings/advanced-settings/" component={AdvancedSettings} />
                <Route path="/profile/settings/personaldata" component={Settings} />
                <Route exact path="/profile/" component={Profile} />
                <Route path="/profile/verify-identity/" component={VerifyIdentity} />
                <Route path="/profile/chpass/" component={ChangePasswordContainer} />
                {/* Redirects for old paths. TODO: redirect in backend server instead */}
                <Route exact path="/profile/security/" render={() => <Redirect to="/profile/settings/" />} />
                <Route
                  exact
                  path="/profile/accountlinking/"
                  render={() => <Redirect to="/profile/settings/advanced-settings/" />}
                />
                <Route exact path="/profile/nins/" render={() => <Redirect to="/profile/verify-identity/" />} />
                <Route exact path="/profile/emails/" render={() => <Redirect to="/profile/settings/personaldata/" />} />
              </Switch>
            </div>
          </div>
        </Splash>
      </section>
      <Footer />
    </React.StrictMode>
  );
}
