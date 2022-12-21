import { AdvancedSettings } from "components/AdvancedSettings";
import { ChangePasswordContainer } from "components/ChangePassword";
import DashboardStart from "components/DashboardStart";
import { ExternalReturnHandler } from "components/ExternalReturnHandler";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { Settings } from "components/Settings";
import Splash from "components/Splash";
import VerifyIdentity from "components/VerifyIdentity";
import { useDashboardAppSelector } from "dashboard-hooks";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export function DashboardMain() {
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  return (
    <React.StrictMode>
      <Header showMenu={true} />
      <section id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path="/profile/settings/advanced-settings/" element={<AdvancedSettings />} />
              <Route path="/profile/settings/personaldata/" element={<Settings />} />
              <Route path="/profile/settings/" element={<Navigate to="/profile/settings/personaldata/" />} />
              <Route path="/profile/verify-identity/" element={<VerifyIdentity />} />
              <Route path="/profile/chpass/" element={<ChangePasswordContainer />} />
              <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
              {/* Navigates for old paths. TODO: redirect in backend server instead */}
              <Route path="/profile/security/" element={<Navigate to="/profile/settings/" />} />
              <Route path="/profile/accountlinking/" element={<Navigate to="/profile/settings/advanced-settings/" />} />
              <Route path="/profile/nins/" element={<Navigate to="/profile/verify-identity/" />} />
              <Route path="/profile/emails/" element={<Navigate to="/profile/settings/personaldata/" />} />
              <Route path="/profile/" element={<DashboardStart />} />
            </Routes>
          </div>
        </Splash>
      </section>
      <Footer />
    </React.StrictMode>
  );
}
