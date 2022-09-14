import CodeVerified from "components/CodeVerified";
import Header from "components/Header";
import Splash from "components/Splash";
import NotificationsContainer from "containers/Notifications";
import Footer from "login/components/Footer/Footer";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSignupAppSelector, useSignupAppDispatch } from "signup-hooks";
import "../login/styles/index.scss";
import React, { useEffect, useState } from "react";
import { signupSlice } from "reducers/Signup";

// export for use in tests
export const SIGNUP_BASE_PATH = "/register";

export function SignupMain(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email); // TODO: is email really shown in signup header?
  const isLoaded = useSignupAppSelector((state) => state.config.is_configured);

  const dispatch = useSignupAppDispatch();
  const [verifyLinkCode, setVerifyLinkCode] = useState<string>();
  const response = useSignupAppSelector((state) => state.signup);

  useEffect(() => {
    if (isLoaded && verifyLinkCode) {
      dispatch(signupSlice.actions.saveVerifyLinkCode(verifyLinkCode));
      dispatch(signupSlice.actions.useVerifyLinkCode());
    }
  }, [isLoaded]);

  // React.StrictMode not used here since it breaks the reCAPTCHA script loader :/
  return (
    <React.Fragment>
      <Header email={email} showLogin={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path={`${SIGNUP_BASE_PATH}/email`} element={<RegisterEmail />} />
              <Route
                path={`${SIGNUP_BASE_PATH}/code/:code`}
                element={<CodeVerified response={response} stateChanger={setVerifyLinkCode} />}
              />
              <Route path={SIGNUP_BASE_PATH} element={<Navigate to={`${SIGNUP_BASE_PATH}/email`} />} />
            </Routes>
          </div>
        </Splash>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
