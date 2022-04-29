import NotificationsContainer from "containers/Notifications";
import Profile from "containers/Profile";
import SplashContainer from "containers/Splash";
import VerifyIdentity from "containers/VerifyIdentity";
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

export const history = createBrowserHistory();

export function DashboardMain() {
  const emails: EmailInfo[] = useDashboardAppSelector((state) => state.emails.emails);
  const all_nins = useDashboardAppSelector((state) => state.nins.nins);

  let email, verifiedNin;
  if (emails.length >= 1) {
    email = emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = "";
  }
  const nins = all_nins.filter((nin) => nin.verified);
  if (nins.length >= 1) {
    verifiedNin = true;
  } else {
    verifiedNin = false;
  }

  // TODO: Instead of passing these props indiscriminately to sub-components, have them fetch their own state
  const props = {
    //eppn
    email: email,
    //nin: state.nins.nin,
    verifiedNin: verifiedNin,
  };

  return (
    <React.Fragment>
      <SplashContainer key="0" />
      <Router key="1" history={history}>
        <Header {...props} showLogout={true} />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <div key="0" id="content" className="horizontal-content-margin content">
            <DashboardNav />
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
