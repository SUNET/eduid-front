import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { Faq } from "./Faq";

export function FaqMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <section id="content" className="horizontal-content-margin content">
          <Routes>
            {/* TODO: Replace to <Route path="/faq" element={<Faq />} /> */}
            <Route path="/static/front-build/faq.dev.html" element={<Faq />} />
          </Routes>
        </section>
      </main>
      <Footer faqPath={"/static/front-build/faq.dev.html"} />
    </React.StrictMode>
  );
}
