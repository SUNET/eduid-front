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

export function LoginMain(): JSX.Element {
  return (
    <React.Fragment>
      <Splash />
      <Header showRegister={true} />
      <section id="panel" className="panel">
        <Notifications />
        <ErrorBoundaryContainer fallback={GenericError}>
          <Router history={history}>
            <LoginApp />
          </Router>
        </ErrorBoundaryContainer>
      </section>
      <Footer />
    </React.Fragment>
  );
}
