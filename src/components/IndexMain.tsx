import { GenericError } from "components/Common/GenericError";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import { ExternalReturnHandler } from "./Common/ExternalReturnHandler";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { PageNotFound } from "./Common/PageNotFound";
import Splash from "./Common/Splash";
import { AcademicIdentities } from "./Dashboard/AcademicIdentitiesPage";
import { AccountSecurity } from "./Dashboard/AccountSecurityPage";
import { AccountSettings } from "./Dashboard/AccountSettingsPage";
import { AuthenticateModal } from "./Dashboard/AuthenticateModal";
import { ChangePassword } from "./Dashboard/ChangePassword";
import { ChangePasswordSuccess } from "./Dashboard/ChangePasswordSuccess";
import Start from "./Dashboard/DashboardStartPage";
import Identity from "./Dashboard/IdentityPage";
import { Help } from "./Help";
import { Index } from "./Index";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import { ResetPasswordApp } from "./ResetPassword/ResetPasswordApp";
import { SignupApp } from "./Signup/SignupApp";
import { Errors } from "./SwamidErrors/Errors";

export const startPath = "/profile/";
export const accountPath = "/profile/settings/personaldata";
export const securityPath = "/profile/settings/advanced-settings";
export const identityPath = "/profile/verify-identity/";
export const academicIdentityPath = "/profile/academic-identities/";
export const SIGNUP_BASE_PATH = "/register";

export function IndexMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const loginRef = useAppSelector((state) => state.login.ref);

  if (location.pathname === "/profile") {
    return <Navigate to={`${location.pathname}/`} />;
  }

  return (
    <React.StrictMode>
      <Header loginRef={loginRef} />
      <main id="panel" className="panel">
        <Notifications />
        <ErrorBoundary FallbackComponent={GenericError}>
          <Splash showChildren={isLoaded}>
            <section id="content" className="horizontal-content-margin content">
              <Routes>
                <Route path="/" element={<Index />} />
                {/* Signup */}
                <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
                {/* Login */}
                <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
                <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
                <Route path="/login/password/:ref" element={<Login />} />
                <Route path="/login/:ref" element={<Login />} />
                <Route path="/reset-password/*" element={<ResetPasswordApp />} />
                {/* Dashboard */}
                <Route path={securityPath} element={<AccountSecurity />} />
                <Route path={accountPath} element={<AccountSettings />} />
                <Route path="/profile/settings/" element={<Navigate to={accountPath} />} />
                <Route path={identityPath} element={<Identity />} />
                <Route path={academicIdentityPath} element={<AcademicIdentities />} />
                <Route path="/profile/chpass/" element={<ChangePassword />} />
                <Route path="/profile/chpass/success" element={<ChangePasswordSuccess />} />
                <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
                {/* Navigates for old paths. TODO: redirect in backend server instead */}
                <Route path="/profile/security/" element={<Navigate to="/profile/settings/" />} />
                <Route path="/profile/accountlinking/" element={<Navigate to={academicIdentityPath} />} />
                <Route path="/profile/nins/" element={<Navigate to={identityPath} />} />
                <Route path="/profile/emails/" element={<Navigate to={accountPath} />} />
                <Route path={startPath} element={<Start />} />
                {/* Errors*/}
                <Route path="/errors" element={<Errors />} />
                <Route path="/help" element={<Help />} />
                <Route path="/faq" element={<Navigate to="/help" />} /> {/* Legacy URL to Help page */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </section>
          </Splash>
        </ErrorBoundary>
        <AuthenticateModal />
      </main>
      <Footer />
    </React.StrictMode>
  );
}
