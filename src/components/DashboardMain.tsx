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

export const startPath = "/start/";
export const identityPath = "/start/verify-identity/";
export const settingsPath = "/start/settings/personaldata";
export const advancedSettingsPath = "/start/settings/advanced-settings";

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
              <Route path="/start/settings/" element={<Navigate to={settingsPath} />} />
              <Route path={identityPath} element={<VerifyIdentity />} />
              <Route path="/start/chpass/" element={<ChangePasswordContainer />} />
              <Route path="/start/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
              {/* Navigates for old paths. TODO: redirect in backend server instead */}
              <Route path="/start/security/" element={<Navigate to="/start/settings/" />} />
              <Route path="/start/accountlinking/" element={<Navigate to={advancedSettingsPath} />} />
              <Route path="/start/nins/" element={<Navigate to={identityPath} />} />
              <Route path="/start/emails/" element={<Navigate to={settingsPath} />} />
              <Route path={startPath} element={<DashboardStart />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
