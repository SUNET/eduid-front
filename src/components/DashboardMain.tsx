import NotificationsContainer from "containers/Notifications";
import { useDashboardAppSelector } from "dashboard-hooks";
import Footer from "login/components/Footer/Footer";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdvancedSettings } from "./AdvancedSettings";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import Header from "./Header";
import Profile from "./Profile";
import { Settings } from "./Settings";
import Splash from "./Splash";
import VerifyIdentity from "./VerifyIdentity";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";

export function DashboardMain() {
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const location = useLocation();

  let email;
  if (emails.length >= 1) {
    email = emails.filter((mail) => mail.primary)[0].email;
  } else {
    email = "";
  }

  const intl = useIntl();

  useEffect(() => {
    switch (location.pathname) {
      case "/profile/verify-identity/":
        document.title = intl.formatMessage({
          id: "document title Identity",
          defaultMessage: "Identity | eduID",
        });
        break;
      case "profile/settings/personaldata":
        document.title = intl.formatMessage({
          id: "document title Settings",
          defaultMessage: "Settings | eduID",
        });
        break;
      case "/profile/settings/advanced-settings":
        document.title = intl.formatMessage({
          id: "document title Advanced Settings",
          defaultMessage: "Advanced Settings | eduID",
        });
        break;
      case "/profile/chpass":
        document.title = intl.formatMessage({
          id: "document title Change Password",
          defaultMessage: "Change Password | eduID",
        });
        break;
      default:
        document.title = intl.formatMessage({
          id: "document title Profile",
          defaultMessage: "Profile | eduID",
        });
        break;
    }
  }, [location]);

  return (
    <React.StrictMode>
      <Header email={email} showLogout={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <DashboardNav />
            <div id="text-content">
              <Routes>
                <Route path="/profile/settings/advanced-settings/" element={<AdvancedSettings />} />
                <Route path="/profile/settings/personaldata/" element={<Settings />} />
                <Route path="/profile/settings/" element={<Navigate to="/profile/settings/personaldata/" />} />
                <Route path="/profile/verify-identity/" element={<VerifyIdentity />} />
                <Route path="/profile/chpass/" element={<ChangePasswordContainer />} />
                {/* Navigates for old paths. TODO: redirect in backend server instead */}
                <Route path="/profile/security/" element={<Navigate to="/profile/settings/" />} />
                <Route
                  path="/profile/accountlinking/"
                  element={<Navigate to="/profile/settings/advanced-settings/" />}
                />
                <Route path="/profile/nins/" element={<Navigate to="/profile/verify-identity/" />} />
                <Route path="/profile/emails/" element={<Navigate to="/profile/settings/personaldata/" />} />
                <Route path="/profile/" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </Splash>
      </section>
      <Footer />
    </React.StrictMode>
  );
}
