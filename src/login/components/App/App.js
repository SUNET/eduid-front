import React, { Component } from "react";
import PropTypes from "prop-types";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import Splash from "../Splash/Splash_container";
import Header from "../../../containers/Header"
// import Header from "../Header/Header_container";
import Notifications from "../Notifications/Notifications_container";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer_container";

import "../../styles/index.scss";

export const history = createBrowserHistory();

class App extends Component {
  render() {
    return [
      <Splash key="0" />,
      <div key="1" id="app-container">
        <Header />
        <section id="content">
          <Notifications />
          <div className="vertical-content-margin">
            <Router history={history}>
              <LoginApp />
            </Router>
          </div>
        </section>
        <Footer {...this.props} />
      </div>
    ];
  }
}

App.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default App;
