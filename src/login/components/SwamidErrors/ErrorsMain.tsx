import NotificationsContainer from "containers/Notifications";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router } from "react-router-dom";
import Header from "../../../components/Header";
import "../../styles/index.scss";
import Footer from "../Footer/Footer";
import { Errors } from "./Errors";

export const history = createBrowserHistory();

export function ErrorsMain(): JSX.Element {
  return (
    <React.StrictMode>
      <Router history={history}>
        <Header />
        <section id="panel" className="panel">
          <NotificationsContainer />
          <Route exact path="/errors" component={Errors} />
        </section>
        <Footer />
      </Router>
    </React.StrictMode>
  );
}
