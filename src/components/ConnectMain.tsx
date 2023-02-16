import { Header } from "components/Header";
import { Notifications } from "components/Notifications";
import Footer from "login/components/Footer/Footer";
import React from "react";
import { Route, Routes } from "react-router-dom";

export function ConnectMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header />
      <main id="panel" className="panel">
        <Notifications />
        <Routes>
          <Route path="/connect" element={<Connect />} />
        </Routes>
      </main>
      <Footer />
    </React.StrictMode>
  );
}

function Connect(): JSX.Element {
  return (
    <div>
      <h1>Connect</h1>
    </div>
  );
}
