import { AdvancedSettings } from "components/Dashboard/AdvancedSettings";
import { ChangePasswordContainer } from "components/Dashboard/ChangePassword";
import VerifyIdentity from "components/Dashboard/VerifyIdentity";
import { ExternalReturnHandler } from "components/ExternalReturnHandler";
import Footer from "components/Footer";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { Settings } from "components/Settings";
import Splash from "components/Splash";
import { useDashboardAppSelector } from "dashboard-hooks";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Start from "./DashboardStart";

export const startPath = "/profile/";
export const identityPath = "/profile/verify-identity/";
export const settingsPath = "/profile/settings/personaldata";
export const advancedSettingsPath = "/profile/settings/advanced-settings";

export function DashboardMain() {
  const isLoaded = useDashboardAppSelector((state) => state.config.is_app_loaded);

  return (
    <React.StrictMode>
      <Header showMenu={true} />
      <main id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <section id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path={advancedSettingsPath} element={<AdvancedSettings />} />
              <Route path={settingsPath} element={<Settings />} />
              <Route path="/profile/settings/" element={<Navigate to={settingsPath} />} />
              <Route path={identityPath} element={<VerifyIdentity />} />
              <Route path="/profile/chpass/" element={<ChangePasswordContainer />} />
              <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
              {/* Navigates for old paths. TODO: redirect in backend server instead */}
              <Route path="/profile/security/" element={<Navigate to="/profile/settings/" />} />
              <Route path="/profile/accountlinking/" element={<Navigate to={advancedSettingsPath} />} />
              <Route path="/profile/nins/" element={<Navigate to={identityPath} />} />
              <Route path="/profile/emails/" element={<Navigate to={settingsPath} />} />
              <Route path={startPath} element={<Start />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}