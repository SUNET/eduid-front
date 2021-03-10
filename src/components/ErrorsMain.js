import React, { Component } from "react";
import { createBrowserHistory } from "history";
// import SplashContainer from "containers/Splash";
import FooterContainer from "containers/Footer";
import HeaderContainer from "containers/Header";
import EmailContainer from "containers/Email";
import NotificationsContainer from "containers/Notifications";
import { Router, Route } from "react-router-dom";


export const history = createBrowserHistory();

class ErrorsMain extends Component {
  render() {
    return [
      // <SplashContainer key="0" />,
      <Router key="1" history={history}>
        <HeaderContainer {...this.props} />
          <section id="panel">
            <NotificationsContainer />
            <Route
              exact
              path={`/errors`} 
              component={EmailContainer}
            />
          </section>
        <FooterContainer {...this.props} />
      </Router>,
    ];
  }
}

ErrorsMain.propTypes = {};

export default ErrorsMain;
