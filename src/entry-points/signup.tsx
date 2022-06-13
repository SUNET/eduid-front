import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import SignupMain from "components/SignupMain";
import { SIGNUP_CONFIG_URL } from "globals";
import { createBrowserHistory } from "history";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { signupStore } from "signup-init-app";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  signupStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(signupStore.dispatch);

export const history = createBrowserHistory();

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={signupStore}>
    <Router history={history}>
      <SignupMain />
    </Router>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
