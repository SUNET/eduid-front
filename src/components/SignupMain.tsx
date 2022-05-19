import Header from "components/Header";
import CodeVerifiedContainer from "containers/CodeVerified";
import EmailInUseContainer from "containers/EmailInUse";
import NotificationsContainer from "containers/Notifications";
import ResendCodeContainer from "containers/ResendCode";
import { createBrowserHistory } from "history";
import Footer from "login/components/Footer/Footer";
import RegisterEmail from "login/components/RegisterEmail/RegisterEmail";
import React from "react";
import { Redirect, Route, Router } from "react-router-dom";
import { useSignupAppSelector } from "signup-hooks";
import { SIGNUP_BASE_PATH } from "../globals";
import "../login/styles/index.scss";
import AccountCreated from "./AccountCreated";
import Splash from "./Splash";

export const history = createBrowserHistory();

export function SignupMain(): JSX.Element {
  const email = useSignupAppSelector((state) => state.signup.email); // TODO: is email really shown in signup header?
  const current_step = useSignupAppSelector((state) => state.signup.current_step); // TODO: is email really shown in signup header?
  const isLoaded = useSignupAppSelector((state) => state.config.is_app_loaded);

  return (
    <React.Fragment>
      <Router key="1" history={history}>
        <Header email={email} showLogin={true} />
        <section id="panel" className="panel">
          <Splash showChildren={isLoaded}>
            <div id="content" className="horizontal-content-margin content">
              <section id="panel" className="panel">
                <NotificationsContainer />
                <Route
                  exact
                  path={`${SIGNUP_BASE_PATH}`}
                  component={() => <Redirect to={`${SIGNUP_BASE_PATH}/email`} />}
                />
                <Route path={`${SIGNUP_BASE_PATH}/email`} component={RegisterEmail} />
                <Route path={`${SIGNUP_BASE_PATH}/new`} component={AccountCreated} />
                <Route path={`${SIGNUP_BASE_PATH}/code-verified`} component={CodeVerifiedContainer} />
                <Route path={`${SIGNUP_BASE_PATH}/resend-code`} component={ResendCodeContainer} />
                <Route path={`${SIGNUP_BASE_PATH}/address-used`} component={EmailInUseContainer} />
              </section>
            </div>
          </Splash>
        </section>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default SignupMain;
