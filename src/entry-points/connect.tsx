import { fetchJsConfig } from "apis/eduidJsConfig";
import { ConnectMain } from "components/ConnectMain";

import { ReduxIntlProvider } from "components/ReduxIntl";
import { connectStore } from "connect-init-app";
import { ERRORS_CONFIG_URL } from "globals";
import { setupLanguage } from "login/translation";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  connectStore.dispatch(fetchJsConfig({ url: ERRORS_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(connectStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={connectStore}>
    <BrowserRouter>
      <ConnectMain />
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
