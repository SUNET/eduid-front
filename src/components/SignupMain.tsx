import CodeVerified from "components/CodeVerified";
import Header from "components/Header";
import Splash from "components/Splash";
import NotificationsContainer from "containers/Notifications";
import Footer from "login/components/Footer/Footer";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSignupAppSelector } from "signup-hooks";
import { SIGNUP_BASE_PATH } from "../globals";
import "../login/styles/index.scss";

export function SignupMain(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email); // TODO: is email really shown in signup header?
  const isLoaded = useSignupAppSelector((state) => state.config.is_configured);

  return (
    <React.Fragment>
      <Header email={email} showLogin={true} />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Splash showChildren={isLoaded}>
          <div id="content" className="horizontal-content-margin content">
            <Route exact path={`${SIGNUP_BASE_PATH}`} component={() => <Redirect to={`${SIGNUP_BASE_PATH}/email`} />} />
            <Route path={`${SIGNUP_BASE_PATH}/email`} component={RegisterEmail} />
            <Route path={`${SIGNUP_BASE_PATH}/code/:code`} component={CodeVerified} />
          </div>
        </Splash>
      </section>
      <Footer />
    </React.Fragment>
  );
}

export default SignupMain;
