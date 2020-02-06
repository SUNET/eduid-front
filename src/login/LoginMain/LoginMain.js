import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

// import FetchingContext from "components/FetchingContext";
import Splash from "../Splash/Splash_container";
import Header from "../Header/Header_container";
import NotificationsContainer from "containers/Notifications";
import Footer from "../Footer/Footer_container";

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
      <Splash key="0" />,
      <Router key="1" history={history}>
        <div id="app-container">
          <Header {...this.props} />
          <section id="content">
            {/* <Notifications /> */}
            <div className="vertical-content-margin">
              {/* <Route exact path="/login/" component={LoginForm} />
              <Route
                path="/reset-password/get-reset-email/"
                component={ResetPassword}
              /> */}
            </div>
          </section>
          <Footer {...this.props} />
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
