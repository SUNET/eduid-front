import { requestCredentials } from "apis/eduidSecurity";
import NotificationsContainer from "containers/Notifications";
import { useDashboardAppSelector, useDashboardAppDispatch } from "dashboard-hooks";
import Footer from "login/components/Footer/Footer";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdvancedSettings } from "./AdvancedSettings";
import { ChangePasswordContainer } from "./ChangePassword";
import DashboardNav from "./DashboardNav";
import { ExternalReturnHandler } from "./ExternalReturnHandler";
import Header from "./Header";
import Profile from "./Profile";
import { Settings } from "./Settings";
import Splash from "./Splash";
import VerifyIdentity from "./VerifyIdentity";

export function DashboardMain() {
  const emails = useDashboardAppSelector((state) => state.emails.emails);
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);
  const dispatch = useDashboardAppDispatch();

  useEffect(() => {
    if (isLoaded) {
      // call requestCredentials once app is loaded
      dispatch(requestCredentials());
    }
  }, [isLoaded]);

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
              <Routes>
                <Route path="/profile/settings/advanced-settings/" element={<AdvancedSettings />} />
                <Route path="/profile/settings/personaldata/" element={<Settings />} />
                <Route path="/profile/settings/" element={<Navigate to="/profile/settings/personaldata/" />} />
                <Route path="/profile/verify-identity/" element={<VerifyIdentity />} />
                <Route path="/profile/chpass/" element={<ChangePasswordContainer />} />
                <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
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
