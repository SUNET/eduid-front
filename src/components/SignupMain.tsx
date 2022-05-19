import Header from "components/Header";
import AccountCreatedContainer from "containers/AccountCreated";
import CaptchaContainer from "containers/Captcha";
import CodeVerifiedContainer from "containers/CodeVerified";
import EmailInUseContainer from "containers/EmailInUse";
import NotificationsContainer from "containers/Notifications";
import ResendCodeContainer from "containers/ResendCode";
import { createBrowserHistory } from "history";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import { useSignupAppSelector } from "signup-hooks";
import { SIGNUP_BASE_PATH } from "../globals";
import Footer from "../login/components/Footer/Footer";
import "../login/styles/index.scss";
import Splash from "./Splash";

export const history = createBrowserHistory();

export function SignupMain(): JSX.Element {
  const email = useSignupAppSelector((state) => state.email.email);
  const captcha = useSignupAppSelector((state) => state.config.captcha);
  const isLoaded = useSignupAppSelector((state) => state.config.is_app_loaded);

  let redirect = `${SIGNUP_BASE_PATH}/email`;

  if (email && !captcha) {
    redirect = `${SIGNUP_BASE_PATH}/trycaptcha`;
  }

  return (
    <React.Fragment>
      <Router key="1" history={history}>
        <Header email={email} showLogin={true} />
        <Splash showChildren={isLoaded}>
          <section id="panel" className="panel">
            <NotificationsContainer />
            <Route exact path={`${SIGNUP_BASE_PATH}`} component={() => <Redirect to={redirect} />} />
            <Route path={`${SIGNUP_BASE_PATH}/email`} component={RegisterEmail} />
            <Route path={`${SIGNUP_BASE_PATH}/trycaptcha`} component={CaptchaContainer} />
            <Route path={`${SIGNUP_BASE_PATH}/new`} component={AccountCreatedContainer} />
            <Route path={`${SIGNUP_BASE_PATH}/code-verified`} component={CodeVerifiedContainer} />
            <Route path={`${SIGNUP_BASE_PATH}/resend-code`} component={ResendCodeContainer} />
            <Route path={`${SIGNUP_BASE_PATH}/address-used`} component={EmailInUseContainer} />
          </section>
        </Splash>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default SignupMain;
