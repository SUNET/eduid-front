import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Splash from "../Splash/Splash_container";
import Header from "../Header/Header_container";
import NotificationsContainer from "containers/Notifications";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer_container";

import "../../styles/index.scss";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return [
      <Splash key="0" />,
      <Router key="1" history={history}>
        <div id="app-container">
          <Header {...this.props} />
          <section id="content">
            {/* <Notifications /> */}
            <div className="vertical-content-margin">
              <LoginApp />
            </div>
          </section>
          <Footer {...this.props} />
        </div>
      </Router>
    ];
  }
}

App.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default App;
