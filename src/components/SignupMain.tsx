import Header from "components/Header";
import Splash from "components/Splash";
import NotificationsContainer from "containers/Notifications";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSignupAppSelector } from "signup-hooks";
import "../login/styles/index.scss";
import CodeVerified from "./CodeVerified";
import { SignupApp } from "./SignupApp";

// export for use in tests
export const SIGNUP_BASE_PATH = "/register";

export function SignupMain(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email); // TODO: is email really shown in signup header?
  const isLoaded = useSignupAppSelector((state) => state.config.is_configured);

  // React.StrictMode not used here since it breaks the reCAPTCHA script loader :/
  return (
    <React.Fragment>
      <Header email={email} showLogin={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <Routes>
            <Route path={`${SIGNUP_BASE_PATH}/code/:code`} element={<CodeVerified />} />
            <Route path={`${SIGNUP_BASE_PATH}/email`} element={<Navigate to={SIGNUP_BASE_PATH} />} />
            <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
          </Routes>
        </Splash>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
