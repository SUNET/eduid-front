import Splash from "components/Splash";
import Notifications from "containers/Notifications";
import { useAppSelector } from "login/app_init/hooks";
import React from "react";
import Header from "../../../components/Header";
import "../../styles/index.scss";
import ErrorBoundaryContainer from "../Errors/ErrorBoundary";
import GenericError from "../Errors/GenericError";
import Footer from "../Footer/Footer";
import LoginApp from "../LoginApp/LoginApp";

export function LoginMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.app.is_loaded);

  return (
    <React.Fragment>
      <Header showRegister={true} />
      <section id="panel" className="panel">
        <Notifications />
        <ErrorBoundaryContainer fallback={GenericError}>
          <Splash showChildren={isLoaded}>
            <LoginApp />
          </Splash>
        </ErrorBoundaryContainer>
      </section>
      <Footer />
    </React.Fragment>
  );
}
