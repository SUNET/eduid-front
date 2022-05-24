import React from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Header from "../../../components/Header";
import ErrorBoundaryContainer from "../Errors/ErrorBoundary";
import GenericError from "../Errors/GenericError";
import LoginApp from "../LoginApp/LoginApp";
import Footer from "../Footer/Footer";
import "../../styles/index.scss";
import Notifications from "containers/Notifications";
import Splash from "components/Splash";
import { useAppSelector } from "login/app_init/hooks";

export const history = createBrowserHistory();

export function LoginMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.app.is_loaded);

  return (
    <React.Fragment>
      <Header showRegister={true} />
      <section id="panel" className="panel">
        <Notifications />
        <ErrorBoundaryContainer fallback={GenericError}>
          <Splash showChildren={isLoaded}>
            <Router history={history}>
              <LoginApp />
            </Router>
          </Splash>
        </ErrorBoundaryContainer>
      </section>
      <Footer />
    </React.Fragment>
  );
}
