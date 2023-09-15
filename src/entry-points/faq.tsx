import { fetchJsConfig } from "apis/eduidJsConfig";
import { HelpMain } from "components/HelpMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { ERRORS_CONFIG_URL } from "globals";
import { helpStore } from "help-init-app";
import { setupLanguage } from "login/translation";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { polyfillsInit } from "./polyfills-common";

import "./public-path";

/* Get configuration */
const getConfig = function () {
  helpStore.dispatch(fetchJsConfig({ url: ERRORS_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(helpStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={helpStore}>
    <BrowserRouter>
      <HelpMain />
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
