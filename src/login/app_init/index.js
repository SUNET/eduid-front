// this needs ot be imported before React even starts
import "../app_utils/betaVersion_cookie";
// checkIfBeta();

import React from "react";
import ReactDOM from "react-dom";

// App.js = store, action and component required to render app
import { Provider } from "react-intl-redux";
import initStore from "./initStore";
import initContainer from "./init_container";
import App from "../components/App/App";

// translation (i18n) import available languages
import injectTranslation from "../app_utils/injectTranslation";
// utils to check support or compatibility
import polyfillElClosest_EI from "../app_utils/el.closest_IE_polyfill";

/* run all utils and set up the translation */
injectTranslation();
polyfillElClosest_EI();

/* render reactIndex.js */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <Provider store={initStore}>
    <App />
  </Provider>,
  initDomTarget,
  initContainer
);
