import { useIndexAppSelector } from "index-hooks";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import Splash from "./Common/Splash";
import { Index } from "./Index";

import { Help } from "./Help";
import Login from "./Login/Login";
import { LoginExternalReturnHandler } from "./Login/LoginExternalReturnHandler";
import UseOtherDevice2 from "./Login/UseOtherDevice2";
import ResetPasswordMain from "./ResetPassword/ResetPasswordMain";
import { SignupApp } from "./Signup/SignupApp";
import { SIGNUP_BASE_PATH } from "./Signup/SignupMain";
import { Errors } from "./SwamidErrors/Errors";

export function IndexMain(): JSX.Element {
  const isLoaded = useIndexAppSelector((state) => state.config.is_configured);
  const authn_options = useIndexAppSelector((state) => state.login.authn_options);
  const loginRef = useIndexAppSelector((state) => state.login.ref);

  return (
    <React.StrictMode>
      <Header
        showLogin={!authn_options}
        showRegister={!authn_options.has_session}
        showLogout={authn_options.has_session}
        loginRef={loginRef}
      />
      <main id="panel" className="panel">
        <Notifications />
        <Splash showChildren={isLoaded}>
          <section id="content" className="horizontal-content-margin content">
            <Routes>
              <Route path="static/front-build/index.dev.html" element={<Index />} />
              {/* Signup */}
              <Route path={SIGNUP_BASE_PATH} element={<SignupApp />} />
              {/* Login */}
              <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
              <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
              <Route path="/login/password/:ref" element={<Login />} />
              <Route path="/login/:ref" element={<Login />} />
              <Route path="/reset-password/*" element={<ResetPasswordMain />} />
              {/* Dashboard */}
              {/* Errors*/}
              <Route path="/errors" element={<Errors />} />
              <Route path="/faq" element={<Help />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
