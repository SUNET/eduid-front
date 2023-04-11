import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Help } from "./Help";

export function HelpMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <section id="content" className="horizontal-content-margin content">
          <Routes>
            {/* TODO: Replace to <Route path="/faq" element={<Faq />} /> */}
            <Route path="/static/front-build/help.dev.html" element={<Help />} />
          </Routes>
        </section>
      </main>
      <Footer faqPath={"/static/front-build/help.dev.html"} />
    </React.StrictMode>
  );
}
