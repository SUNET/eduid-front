import { GenericError } from "components/GenericError";
import Header from "components/Header";
import Splash from "components/Splash";
import Notifications from "containers/Notifications";
import { useAppSelector } from "login/app_init/hooks";
import "login/styles/index.scss";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Footer from "./Footer/Footer";
import LoginApp from "./LoginApp/LoginApp";

export function LoginMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.app.is_loaded);

  return (
    <React.StrictMode>
      <Header showRegister={true} />
      <section id="panel" className="panel">
        <Notifications />
        <ErrorBoundary FallbackComponent={GenericError}>
          <Splash showChildren={isLoaded}>
            <LoginApp />
          </Splash>
        </ErrorBoundary>
      </section>
      <Footer />
    </React.StrictMode>
  );
}
