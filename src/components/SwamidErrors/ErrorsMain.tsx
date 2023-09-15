import Footer from "components/Common/Footer";
import { Header } from "components/Common/Header";
import { Notifications } from "components/Common/Notifications";
import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Footer helpPath="faq" />
    </React.StrictMode>
  );
}
