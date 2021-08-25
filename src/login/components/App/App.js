import React, { Component } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Splash from "../Splash/Splash_container";
import Banner from "../Banner/Banner";
import Buggy from "../Buggy";
import ErrorBoundaryContainer from "../Errors/ErrorBoundary";
import GenericError from "../Errors/GenericError";
import Notifications from "../Notifications/Notifications_container";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer";
import "../../styles/index.scss";

export const history = createBrowserHistory();
class App extends Component {
  state = { faulty: true };
  handleError = () => {
    this.setState({ faulty: false });
  };

  render() {
    return (
      <>
        <Splash />
        <Banner {...this.props} />
        <section id="panel">
          <Notifications />
          <ErrorBoundaryContainer
            {...this.props}
            handleError={this.handleError}
            fallback={GenericError}
          >
            <Router history={history}>
              <LoginApp />
              {this.state.faulty ? <Buggy /> : null}
            </Router>
          </ErrorBoundaryContainer>
        </section>
        <Footer {...this.props} />
      </>
    );
  }
}

App.propTypes = {};

export default App;
