import { GenericError } from "components/GenericError";
import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import Splash from "components/Splash";
import { useAppSelector } from "hooks";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import Footer from "../Footer";
import LoginApp from "./LoginApp";

export function LoginMain(): JSX.Element {
  const isLoaded = useAppSelector((state) => state.app.is_loaded);
  const authn_options = useAppSelector((state) => state.login.authn_options);
  const loginRef = useAppSelector((state) => state.login.ref);

  return (
    <React.StrictMode>
      <Header showRegister={!authn_options.has_session} showLogout={authn_options.has_session} loginRef={loginRef} />
      <main id="panel" className="panel">
        <Notifications />
        <ErrorBoundary FallbackComponent={GenericError}>
          <Splash showChildren={isLoaded}>
            <LoginApp />
          </Splash>
        </ErrorBoundary>
      </main>
      <Footer />
    </React.StrictMode>
  );
}