import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import FetchingContext from "components/FetchingContext";
import SplashContainer from "containers/Splash";
import NotificationsContainer from "containers/Notifications";
import FooterContainer from "containers/Footer";

import InitResetFormContainer from "login/InitResetForm/InitResetForm_container";
import ResettingContainer from "login/Resetting/Resetting_container";

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
    return [
      //<FetchingContext.Provider value={this.state}>
        <SplashContainer key="0" />,
        <Router key="1" history={history}>
          <div className="login-wrapper">
            <div id="login-text">
              <div id="welcome">
              </div>
              <div id="content">
                <NotificationsContainer />
                <Route
                  exact
                  path="/"
                  render={props => <div {...props} ></div>}
                />
                <Route
                  exact
                  path="/reset/reset-password/"
                  render={props => <InitResetFormContainer {...props} />}
                />
                <Route
                  path="/reset/reset-password/code/"
                  render={props => <ResettingContainer {...props} />}
                />
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
