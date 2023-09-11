import Footer from "components/Common/Footer";
import { Header } from "components/Common/Header";
import { Notifications } from "components/Common/Notifications";
import { PageNotFound } from "components/Common/PageNotFound";
import Splash from "components/Common/Splash";
import { Help } from "components/Help";
import CodeVerified from "components/Signup/CodeVerified";
import { useIndexAppSelector as useSignupAppSelector } from "index-hooks";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignupApp } from "./SignupApp";

// export for use in tests
export const SIGNUP_BASE_PATH = "/register";

export function SignupMain(): JSX.Element {
  const isLoaded = useSignupAppSelector((state) => state.config.is_configured);

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
            <Routes>
              <Route path={`${SIGNUP_BASE_PATH}/code/:code`} element={<CodeVerified />} />
              <Route path={`${SIGNUP_BASE_PATH}/email`} element={<Navigate to={SIGNUP_BASE_PATH} />} />
              <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
              <Route path="faq" element={<Help />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
