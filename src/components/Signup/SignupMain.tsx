import CodeVerified from "components/CodeVerified";
import { Header } from "components/Header";
import { Help } from "components/Help";
import { Notifications } from "components/Notifications";
import Splash from "components/Splash";
import { useAppSelector } from "eduid-hooks";
import Footer from "login/components/Footer/Footer";
import "login/styles/index.scss";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignupApp } from "./SignupApp";
import { SignupGlobalStateProvider } from "./SignupGlobalState";

// export for use in tests
export const SIGNUP_BASE_PATH = "/register";

export function SignupMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.config.is_configured);

  const intl = useIntl();

  useEffect(() => {
    document.title = intl.formatMessage({
      id: "document title Register",
      defaultMessage: "Register | eduID",
    });
  }, []);

  // React.StrictMode not used here since it breaks the reCAPTCHA script loader :/
  return (
    <React.Fragment>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <section id="content" className="horizontal-content-margin content">
            <SignupGlobalStateProvider>
              <Routes>
                <Route path={`${SIGNUP_BASE_PATH}/code/:code`} element={<CodeVerified />} />
                <Route path={`${SIGNUP_BASE_PATH}/email`} element={<Navigate to={SIGNUP_BASE_PATH} />} />
                <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
                <Route path={`${SIGNUP_BASE_PATH}/faq`} element={<Help />} />
              </Routes>
            </SignupGlobalStateProvider>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
