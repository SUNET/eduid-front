import { ReduxIntlProvider } from "components/ReduxIntl";
import { polyfillsInit } from "entry-points/polyfills-common";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { LoginMain } from "../components/App/App";
import initStore from "./initStore";
import initContainer from "./init_container";

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(initStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={initStore}>
    <LoginMain />
  </ReduxIntlProvider>,
  initDomTarget,
  initContainer
);
