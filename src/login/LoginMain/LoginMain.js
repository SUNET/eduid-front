import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import InitResetFormContainer from "login/InitResetForm/InitResetForm_container";
import ResettingContainer from "login/Resetting/Resetting_container";
import DoResetContainer from "login/DoReset/DoReset_container";


import "style/base.scss";
import "./LoginMain.scss";

export const history = createBrowserHistory();

class Main extends Component {

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
    let routes = '';
    if (!this.props.error) {
      routes = [
        <Route
          key="0"
          exact
          path="/"
          render={props => <div {...props} ></div>}
        />,
        <Route
          key="1"
          exact
          path="/reset-password/"
          render={props => <InitResetFormContainer {...props} />}
        />,
        <Route
          key="2"
          path="/reset-password/code/"
          render={props => <ResettingContainer {...props} />}
        />,
        <Route
          key="3"
          path="/reset-password/choose/"
          render={props => <DoResetContainer {...props} />}
        />,
      ];
    }
    return [
      //<FetchingContext.Provider value={this.state}>
        <SplashContainer key="0" />,
        <Router key="1" history={history}>
          <div className="login-wrapper">
            <HeaderContainer {...this.props} />
            <div id="login-text">
              <div id="welcome">
              </div>
              <div id="content">
                <NotificationsContainer />
                {routes}
              </div>
            </div>
            <FooterContainer {...this.props} />
          </div>
        </Router>
      //</FetchingContext.Provider>
    ];
  }
}

Main.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default Main;
