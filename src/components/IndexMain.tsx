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
      <Header />
      <main id="panel" className="panel">
        <Notifications />
        <Routes>
          <Route path="static/front-build/index.dev.html" element={<Index />} />
        </Routes>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
