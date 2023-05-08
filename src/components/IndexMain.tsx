import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../src/login/styles/index.scss";
import Footer from "../login/components/Footer/Footer";
import { Index } from "./Index";

export function IndexMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header showLogin={true} />
      <main id="panel" className="panel">
        <Notifications />
        <section id="content" className="horizontal-content-margin content">
          <Routes>
            <Route path="static/front-build/index.dev.html" element={<Index />} />
          </Routes>
        </section>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
