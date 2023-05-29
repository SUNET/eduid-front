import { useIndexAppSelector } from "index-hooks";
import Login from "login/components/LoginApp/Login/Login";
import UseOtherDevice2 from "login/components/LoginApp/Login/UseOtherDevice2";
import ResetPassword from "login/components/LoginApp/ResetPassword/ResetPassword";
import { Errors } from "login/components/SwamidErrors/Errors";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/index.scss";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import Splash from "./Common/Splash";
import { Index } from "./Index";
import { LoginExternalReturnHandler } from "./LoginExternalReturnHandler";
import { SignupApp } from "./Signup/SignupApp";
import { SIGNUP_BASE_PATH } from "./Signup/SignupMain";

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
              <Route path="/login/ext-return/:app_name/:authn_id" element={<LoginExternalReturnHandler />} />
              <Route path="/login/other/:state_id" element={<UseOtherDevice2 />} />
              <Route path="/login/password/:ref" element={<Login />} />
              <Route path="/login/:ref" element={<Login />} />
              <Route path="/reset-password/*" element={<ResetPassword />} />
              {/* Dashboard */}
              {/* Errors*/}
              <Route path="/errors" element={<Errors />} />
            </Routes>
          </section>
        </Splash>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
