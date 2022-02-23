import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Splash from "../Splash/Splash_container";
import Header from "../../../components/Header";
import ErrorBoundaryContainer from "../Errors/ErrorBoundary";
import GenericError from "../Errors/GenericError";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer";
import "../../styles/index.scss";
import Notifications from "containers/Notifications";

export const history = createBrowserHistory();

class App extends React.Component {
  // run-time type checking in development mode
  static propTypes = {};

  render() {
    return (
      <>
        <Splash />
        <Header showRegister={true} />
        <section id="panel" className="panel">
          <Notifications />
          <ErrorBoundaryContainer {...this.props} fallback={GenericError}>
            <Router history={history}>
              <LoginApp />
            </Router>
          </ErrorBoundaryContainer>
        </section>
        <Footer />
      </>
    );
  }
}

export default App;
