import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import SplashContainer from "containers/Splash";
import Footer from "../login/components/Footer/Footer";
import Header from "components/Header";
import EmailContainer from "containers/Email";
import AccountCreatedContainer from "containers/AccountCreated";
import CodeVerifiedContainer from "containers/CodeVerified";
import ResendCodeContainer from "containers/ResendCode";
import CaptchaContainer from "containers/Captcha";
import NotificationsContainer from "containers/Notifications";
import EmailInUseContainer from "containers/EmailInUse";

import "../login/styles/index.scss";

export const history = createBrowserHistory();
import { SIGNUP_BASE_PATH } from "../globals";

class SignupMain extends Component {
  render() {
    let redirect = `${SIGNUP_BASE_PATH}/email`;

    if (this.props.email) {
      if (this.props.captcha) {
        if (this.props.code) {
        } else {
        }
      } else {
        redirect = `${SIGNUP_BASE_PATH}/trycaptcha`;
      }
    }

    return [
      <SplashContainer key="0" />,
      <Router key="1" history={history}>
        <Header {...this.props} showLogin={true} />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <Route exact path={`${SIGNUP_BASE_PATH}`} component={() => <Redirect to={redirect} />} />
          <Route path={`${SIGNUP_BASE_PATH}/email`} component={EmailContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/trycaptcha`} component={CaptchaContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/new`} component={AccountCreatedContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/code-verified`} component={CodeVerifiedContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/resend-code`} component={ResendCodeContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/address-used`} component={EmailInUseContainer} />
        </section>
        <Footer />
      </Router>,
    ];
  }
}

SignupMain.propTypes = {};

export default SignupMain;
