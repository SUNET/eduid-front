import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
//import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import Footer from "../login/components/Footer/Footer";
import HeaderContainer from "containers/Header";
import EmailContainer from "containers/Email";
import AccountCreatedContainer from "containers/AccountCreated";
import CodeVerifiedContainer from "containers/CodeVerified";
import ResendCodeContainer from "containers/ResendCode";
import CaptchaContainer from "containers/Captcha";
import NotificationsContainer from "containers/Notifications";
import EmailInUseContainer from "containers/EmailInUse";

// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "style/base.scss";
import "../login/styles/index.scss";

export const history = createBrowserHistory();
import { SIGNUP_BASE_PATH } from "../globals";

class SignupMain extends Component {
  //constructor(props) {
  //super(props);

  //this.state = {
  //fetching: props.is_fetching,
  //setFetching: this.setFetching.bind(this)
  //};
  //}

  //setFetching(fetching) {
  //this.setState({
  //fetching: fetching
  //});
  //}

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

    // return (
    //   <FetchingContext.Provider value={this.state}>
    //     <SplashContainer />
    //     <div className="container-fluid">
    //       <HeaderContainer withButtons={true} />
    //       <Router history={history}>
    //         <div className="jumbotron">
    //           <div className="row">
    //             <div className="col-lg-2" />
    //             <div className="col-lg-8">
    //               <NotificationsContainer />
    //             </div>
    //             <div className="col-lg-2" />
    //
    //       </Router>
    //       <FooterContainer />
    //     </div>
    //   </FetchingContext.Provider>
    // );

    // XXX <FetchingContext.Provider value={this.state}> ... </FetchingContext.Provider>
    // should wrap the splash container and router once we get back to using
    // it.
    return [
      <SplashContainer key="0" />,
      <Router key="1" history={history}>
        <HeaderContainer {...this.props} />
        <section id="panel">
          <NotificationsContainer />
          <Route exact path={`${SIGNUP_BASE_PATH}`} component={() => <Redirect to={redirect} />} />
          <Route path={`${SIGNUP_BASE_PATH}/email`} component={EmailContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/trycaptcha`} component={CaptchaContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/new`} component={AccountCreatedContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/code-verified`} component={CodeVerifiedContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/resend-code`} component={ResendCodeContainer} />
          <Route path={`${SIGNUP_BASE_PATH}/address-used`} component={EmailInUseContainer} />
        </section>
        <Footer {...this.props} />
      </Router>,
    ];
  }
}

SignupMain.propTypes = {};

export default SignupMain;
