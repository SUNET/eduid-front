<<<<<<< HEAD
import Footer from "components/Common/Footer";
import { Header } from "components/Common/Header";
import { Notifications } from "components/Common/Notifications";
import Splash from "components/Common/Splash";
import CodeVerified from "components/Signup/CodeVerified";
import { useIndexAppSelector as useSignupAppSelector } from "index-hooks";
=======
import CodeVerified from "components/CodeVerified";
import { Header } from "components/Header";
import { Help } from "components/Help";
import { Notifications } from "components/Notifications";
import Splash from "components/Splash";
import Footer from "login/components/Footer/Footer";
import "login/styles/index.scss";
>>>>>>> 0c595a5e6 (Add faq component)
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
          <Routes>
            <Route path={`${SIGNUP_BASE_PATH}/code/:code`} element={<CodeVerified />} />
            <Route path={`${SIGNUP_BASE_PATH}/email`} element={<Navigate to={SIGNUP_BASE_PATH} />} />
            <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
          </Routes>
        </Splash>
      </main>
      <Footer helpPath={`${SIGNUP_BASE_PATH}/faq`} />
    </React.Fragment>
  );
}

export default SignupMain;
