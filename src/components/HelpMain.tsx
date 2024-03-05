import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { PageNotFound } from "./Common/PageNotFound";
import { Help } from "./Help";

export function HelpMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <section id="content" className="horizontal-content-margin content">
          <Routes>
            <Route path="/faq" element={<Help />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
