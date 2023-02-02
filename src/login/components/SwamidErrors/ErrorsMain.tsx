import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../styles/index.scss";
import Footer from "../Footer/Footer";
import { Errors } from "./Errors";

export function ErrorsMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header />
      <main id="panel" className="panel">
        <Notifications />
        <Routes>
          <Route path="/errors" element={<Errors />} />
        </Routes>
      </main>
      <Footer />
    </React.StrictMode>
  );
}
