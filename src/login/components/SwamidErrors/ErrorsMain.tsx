import NotificationsContainer from "containers/Notifications";
import React from "react";
import { Switch } from "react-router-dom";
import { CompatRoute as Route } from "react-router-dom-v5-compat";
import Header from "../../../components/Header";
import "../../styles/index.scss";
import Footer from "../Footer/Footer";
import { Errors } from "./Errors";

export function ErrorsMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Header />
      <section id="panel" className="panel">
        <NotificationsContainer />
        <Switch>
          <Route path="/errors" element={<Errors />} />
        </Switch>
      </section>
      <Footer />
    </React.StrictMode>
  );
}
