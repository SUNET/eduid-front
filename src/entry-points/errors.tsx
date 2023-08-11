import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { errorsStore } from "errors-init-app";
import { ERRORS_CONFIG_URL } from "globals";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { setupLanguage } from "translation";
import "../../src/styles/index.scss";
import { ErrorsMain } from "../components/SwamidErrors/ErrorsMain";
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
      <ErrorsMain />
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
