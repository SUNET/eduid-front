import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Splash from "../Splash/Splash_container";
import Banner from "../Banner/Banner";
import Notifications from "../Notifications/Notifications_container";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer";
import "../../styles/index.scss";

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <>
        <Splash />
        <Banner {...this.props} />
        <section id="panel">
          <Notifications />
          <Router history={history}>
            <LoginApp />
          </Router>
        </section>
        <Footer {...this.props} />
      </>
    );
  }
}

App.propTypes = {};

export default App;
