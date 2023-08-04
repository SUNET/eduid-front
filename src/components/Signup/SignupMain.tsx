import Footer from "components/Footer";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import CodeVerified from "components/Signup/CodeVerified";
import Splash from "components/Splash";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSignupAppSelector } from "signup-hooks";
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
          <Routes>
            <Route path={`${SIGNUP_BASE_PATH}/code/:code`} element={<CodeVerified />} />
            <Route path={`${SIGNUP_BASE_PATH}/email`} element={<Navigate to={SIGNUP_BASE_PATH} />} />
            <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
          </Routes>
        </Splash>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
