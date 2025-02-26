import { GenericError } from "components/Common/GenericError";
import { useAppSelector } from "eduid-hooks";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "../styles/index.scss";
import { ExternalReturnHandler } from "./Common/ExternalReturnHandler";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { PageNotFound } from "./Common/PageNotFound";
import Splash from "./Common/Splash";
import { Account } from "./Dashboard/Account";
import { AuthenticateModal } from "./Dashboard/AuthenticateModal";
import { ChangePassword } from "./Dashboard/ChangePassword";
import { ChangePasswordSuccess } from "./Dashboard/ChangePasswordSuccess";
import Start from "./Dashboard/DashboardStart";
import Identity from "./Dashboard/Identity";
import { Security } from "./Dashboard/Security";
import { Help } from "./Help";
import { Index } from "./Index";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import { ResetPasswordApp } from "./ResetPassword/ResetPasswordApp";
import ScrollToTop from "./ScrollToTop";
import { SignupApp } from "./Signup/SignupApp";
import { Errors } from "./SwamidErrors/Errors";

export const START_PATH = "/profile/";
export const ACCOUNT_PATH = "/profile/account/";
export const SECURITY_PATH = "/profile/security/";
export const IDENTITY_PATH = "/profile/identity/";
export const SIGNUP_BASE_PATH = "/register";

export function IndexMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const loginRef = useAppSelector((state) => state.login.ref);
  const location = useLocation();
  const showAuthenticateModal = location.pathname.startsWith("/profile");
  const isIndex = location.pathname === "/";

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
            <section id="content" className={isIndex ? "" : "horizontal-content-margin content"}>
              <ScrollToTop />
              <Routes>
                {/* Landing */}
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
                <Route path={SECURITY_PATH} element={<Security />} />
                <Route path={ACCOUNT_PATH} element={<Account />} />
                <Route path={IDENTITY_PATH} element={<Identity />} />
                <Route path="/profile/chpass/" element={<ChangePassword />} />
                <Route path="/profile/chpass/success" element={<ChangePasswordSuccess />} />
                <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
                {/* Navigates for old paths. TODO: redirect in backend server instead */}
                <Route path="/profile/accountlinking/" element={<Navigate to={ACCOUNT_PATH} />} />
                <Route path="/profile/nins/" element={<Navigate to={IDENTITY_PATH} />} />
                <Route path="/profile/emails/" element={<Navigate to={ACCOUNT_PATH} />} />
                <Route path="/profile/settings/" element={<Navigate to={ACCOUNT_PATH} />} />
                <Route path="/profile/settings/personaldata/" element={<Navigate to={ACCOUNT_PATH} />} />
                <Route path="/profile/settings/advanced-settings/" element={<Navigate to={SECURITY_PATH} />} />
                <Route path="/profile/verify-identity/" element={<Navigate to={IDENTITY_PATH} />} />
                <Route path={START_PATH} element={<Start />} />
                {/* Errors*/}
                <Route path="/errors" element={<Errors />} />
                <Route path="/help" element={<Help />} />
                <Route path="/faq" element={<Navigate to="/help" />} /> {/* Legacy URL to Help page */}
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </section>
            {showAuthenticateModal && <AuthenticateModal />}
          </Splash>
        </ErrorBoundary>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
