import React, { Component, Fragment } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Splash from "../Splash/Splash_container";
import Header from "../../../containers/Header";
import Notifications from "../Notifications/Notifications_container";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer_container";
import "../../styles/index.scss";

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <>
        <Splash />
        <Header/>
        <section id="panel">
          <Notifications />
          <Router history={history}>
            <LoginApp />
          </Router>
        </section>
        <Footer {...this.props} />
      </>
    )
  }
}

App.propTypes = {
  //is_fetching: PropTypes.bool,
};

export default App;
