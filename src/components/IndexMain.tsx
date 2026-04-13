import { GenericError } from "components/Common/GenericError";
import { useAppSelector } from "eduid-hooks";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useIntl } from "react-intl";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { dynamicMessage } from "translation";
import "../styles/index.scss";
import { ExternalReturnHandler } from "./Common/ExternalReturnHandler";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { PageNotFound } from "./Common/PageNotFound";
import Splash from "./Common/Splash";
import { ThemeProvider } from "./Common/ThemeContext";
import { Account } from "./Dashboard/Account";
import { AuthenticateModal } from "./Dashboard/AuthenticateModal";
import { ChangePassword } from "./Dashboard/ChangePassword";
import { ChangePasswordSuccess } from "./Dashboard/ChangePasswordSuccess";
import Start from "./Dashboard/DashboardStart";
import Identity from "./Dashboard/Identity";
import { Security } from "./Dashboard/Security";
import { Help } from "./Help/HelpIntro";
import { Index } from "./Index";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import { ResetPasswordApp } from "./ResetPassword/ResetPasswordApp";
import ScrollToHash from "./ScrollToHash";
import ScrollToTop from "./ScrollToTop";
import { SignupApp } from "./Signup/SignupApp";
import { Errors } from "./SwamidErrors/Errors";

export const LOGIN_BASE_PATH = "/login";
export const RESET_PASSWORD_PATH = "/reset-password";
export const START_PATH = "/start";
export const ACCOUNT_PATH = "/account";
export const SECURITY_PATH = "/security";
export const IDENTITY_PATH = "/identity";
export const SIGNUP_BASE_PATH = "/register";
export const CHPASS_BASE_PATH = "/chpass";

export const SETTINGS_PATHS = [START_PATH, ACCOUNT_PATH, SECURITY_PATH, IDENTITY_PATH, CHPASS_BASE_PATH, "/profile"];

const TITLE_MAP: ReadonlyArray<{ match: string; id: string; defaultMessage: string }> = [
  {
    match: "/login/other/",
    id: "document title Log in using another device",
    defaultMessage: "Log in using another device | eduID",
  },
  { match: LOGIN_BASE_PATH, id: "document title Log in", defaultMessage: "Log in | eduID" },
  { match: ACCOUNT_PATH, id: "document title Account", defaultMessage: "Account | eduID" },
  { match: CHPASS_BASE_PATH, id: "document title Change Password", defaultMessage: "Change password | eduID" },
  { match: START_PATH, id: "document title Start", defaultMessage: "Start | eduID" },
  { match: IDENTITY_PATH, id: "document title Identity", defaultMessage: "Identity | eduID" },
  { match: SECURITY_PATH, id: "document title Security", defaultMessage: "Security | eduID" },
  { match: "/help", id: "document title Help", defaultMessage: "Help | eduID" },
  { match: "/reset-password", id: "document title Reset Password", defaultMessage: "Reset password | eduID" },
  { match: SIGNUP_BASE_PATH, id: "document title Register", defaultMessage: "Register | eduID" },
];

function useDocumentTitle() {
  const { pathname } = useLocation();
  const intl = useIntl();

  useEffect(() => {
    const entry = TITLE_MAP.find(({ match }) => pathname.startsWith(match));
    if (entry) {
      document.title = dynamicMessage(intl, entry.id);
    } else {
      document.title = "eduID";
    }
  }, [pathname, intl]);
}

export function IndexMain(): React.JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);
  const loginRef = useAppSelector((state) => state.login.ref);
  const location = useLocation();
  const showAuthenticateModal = SETTINGS_PATHS.some((path) => location.pathname.startsWith(path));
  const isIndex = location.pathname === "/";

  useDocumentTitle();
  console.log("huhuhuh");
  // Legacy /profile redirects
  if (location.pathname === "/profile" || location.pathname === "/profile/") {
    return <Navigate to={START_PATH} replace />;
  }

  return (
    <React.StrictMode>
      <ThemeProvider>
        <div className={isIndex ? "page-wrapper landing" : "page-wrapper"}>
          <ScrollToHash />
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
                    <Route
                      path={`${LOGIN_BASE_PATH}/ext-return/:app_name/:authn_id`}
                      element={<LoginExternalReturnHandler />}
                    />
                    <Route path={`${LOGIN_BASE_PATH}/other/:state_id`} element={<UseOtherDevice2 />} />
                    <Route path={`${LOGIN_BASE_PATH}/password/:ref`} element={<Login />} />
                    <Route path={`${LOGIN_BASE_PATH}/:ref`} element={<Login />} />
                    <Route path={`${LOGIN_BASE_PATH}/mfa/password/:ref`} element={<Login />} />
                    <Route path={RESET_PASSWORD_PATH} element={<ResetPasswordApp />} />
                    {/* Dashboard */}
                    <Route path={SECURITY_PATH} element={<Security />} />
                    <Route path={ACCOUNT_PATH} element={<Account />} />
                    <Route path={IDENTITY_PATH} element={<Identity />} />
                    <Route path={CHPASS_BASE_PATH} element={<ChangePassword />} />
                    <Route path={`${CHPASS_BASE_PATH}/success`} element={<ChangePasswordSuccess />} />
                    <Route path="/profile/ext-return/:app_name/:authn_id" element={<ExternalReturnHandler />} />
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
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
}
