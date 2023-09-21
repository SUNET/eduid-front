import { useIndexAppSelector } from "index-hooks";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import Splash from "./Common/Splash";
import { Index } from "./Index";

import { ExternalReturnHandler } from "./Common/ExternalReturnHandler";
import { Settings } from "./Common/Settings";
import { AdvancedSettings } from "./Dashboard/AdvancedSettings";
import { ChangePasswordContainer } from "./Dashboard/ChangePassword";
import Start from "./Dashboard/DashboardStart";
import VerifyIdentity from "./Dashboard/VerifyIdentity";
import { Help } from "./Help";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import { SignupApp } from "./Signup/SignupApp";
import { SIGNUP_BASE_PATH } from "./Signup/SignupMain";
import { Errors } from "./SwamidErrors/Errors";

export const startPath = "/profile/";
export const identityPath = "/profile/verify-identity/";
export const settingsPath = "/profile/settings/personaldata";
export const advancedSettingsPath = "/profile/settings/advanced-settings";

export function IndexMain(): JSX.Element {
  const isLoaded = useIndexAppSelector((state) => state.config.is_configured);
  const authn_options = useIndexAppSelector((state) => state.login.authn_options);
  const loginRef = useIndexAppSelector((state) => state.login.ref);

  return (
    <React.StrictMode>
      <Header
        showLogin={!authn_options}
        showRegister={!authn_options.has_session}
        showLogout={authn_options.has_session}
        loginRef={loginRef}
      />
      <main id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <section id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path="static/front-build/index.dev.html" element={<Index />} />
              {/* Signup */}
              <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
              {/* Login */}
              <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
              <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
              <Route path="/login/password/:ref" element={<Login />} />
              <Route path="/login/:ref" element={<Login />} />
              <Route path="/reset-password/*" element={<ResetPasswordMain />} />
              {/* Dashboard */}
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
              {/* Errors*/}
              <Route path="/errors" element={<Errors />} />
              <Route path="/faq" element={<Help />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
