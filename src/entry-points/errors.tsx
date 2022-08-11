import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { errorsStore } from "errors-init-app";
import { ERRORS_CONFIG_URL } from "globals";
import { setupLanguage } from "login/translation";
import ReactDOM from "react-dom";
import { BrowserRouter, CompatRouter } from "react-router-dom-v5-compat";
import { ErrorsMain } from "../login/components/SwamidErrors/ErrorsMain";
import { polyfillsInit } from "./polyfills-common";

import "./public-path";

/* Get configuration */
const getConfig = function () {
  errorsStore.dispatch(fetchJsConfig({ url: ERRORS_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(errorsStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={errorsStore}>
    <BrowserRouter>
      <CompatRouter>
        <ErrorsMain />
      </CompatRouter>
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
