import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { LOGIN_CONFIG_URL } from "globals";
import { createBrowserHistory } from "history";
import { loginStore } from "login-init-app";
import { appLoaded } from "login/components/App/App_actions";
import { LoginMain } from "login/components/LoginMain";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = async function () {
  console.log("Initializing state for the login app...");
  const config = await loginStore.dispatch(fetchJsConfig({ url: LOGIN_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(config)) {
    loginStore.dispatch(appLoaded());
  }
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(loginStore.dispatch);

export const loginHistory = createBrowserHistory();

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={loginStore}>
    <Router history={loginHistory}>
      <LoginMain />
    </Router>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
