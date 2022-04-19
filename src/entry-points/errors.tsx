import { ReduxIntlProvider } from "components/ReduxIntl";
import { errorsStore } from "errors-init-app";
import { updateErrorsConfigData } from "login/redux/actions/errorsMainActions";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import ErrorsMain from "../login/components/SwamidErrors/ErrorsMain";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  errorsStore.dispatch(updateErrorsConfigData());
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(errorsStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={errorsStore}>
    <ErrorsMain />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
