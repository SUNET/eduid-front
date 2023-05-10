import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import { useIndexAppSelector } from "index-hooks";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../src/login/styles/index.scss";
import Footer from "../login/components/Footer/Footer";
import { Index } from "./Index";
import { SignupApp } from "./Signup/SignupApp";
import { SIGNUP_BASE_PATH } from "./Signup/SignupMain";
import Splash from "./Splash";

export function IndexMain(): JSX.Element {
  const isLoaded = useIndexAppSelector((state) => state.config.is_configured);
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <section id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path="static/front-build/index.dev.html" element={<Index />} />
              {/* Signup */}
              <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
              {/* Login */}
              {/* Dashboard */}
              {/* Errors*/}
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
