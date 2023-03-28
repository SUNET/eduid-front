import { fetchJsConfig } from "apis/eduidJsConfig";
import { FaqMain } from "components/FaqMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { faqStore } from "faq-init-app";
import { ERRORS_CONFIG_URL } from "globals";
import { setupLanguage } from "login/translation";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { polyfillsInit } from "./polyfills-common";

import "./public-path";

/* Get configuration */
const getConfig = function () {
  faqStore.dispatch(fetchJsConfig({ url: ERRORS_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(faqStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={faqStore}>
    <BrowserRouter>
      <FaqMain />
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
