import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import { Header } from "./Common/Header";
import { Notifications } from "./Common/Notifications";
import { Help } from "./Help";

export function HelpMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <section id="content" className="horizontal-content-margin content">
          <Routes>
            <Route path="/help" element={<Help />} />
          </Routes>
        </section>
      </main>
      <Footer helpPath="/help" />
    </React.StrictMode>
  );
}
