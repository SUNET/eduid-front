import { useAppSelector } from "eduid-hooks";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { ExternalReturnHandler } from "./Common/ExternalReturnHandler";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { Settings } from "./Common/Settings";
import Splash from "./Common/Splash";
import { AdvancedSettings } from "./Dashboard/AdvancedSettings";
import { ChangePasswordContainer } from "./Dashboard/ChangePassword";
import Start from "./Dashboard/DashboardStart";
import VerifyIdentity from "./Dashboard/VerifyIdentity";
import { Help } from "./Help";
import { Index } from "./Index";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import { SignupApp } from "./Signup/SignupApp";
import { Errors } from "./SwamidErrors/Errors";

export const startPath = "/profile/";
export const identityPath = "/profile/verify-identity/";
export const settingsPath = "/profile/settings/personaldata";
export const advancedSettingsPath = "/profile/settings/advanced-settings";
export const SIGNUP_BASE_PATH = "/register";

export function IndexMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const loginRef = useAppSelector((state) => state.login.ref);
  const eppn = useAppSelector((state) => state.personal_data.eppn);

  return (
    <React.StrictMode>
      <Header loginRef={loginRef} showMenu={Boolean(eppn)} />
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
