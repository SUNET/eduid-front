// package is deprecated (now available as @ungap/url-search-params)
// // URL.searchParams polyfill
// 
// // End polyfill

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
import checkTranslationSupport from "../app_utils/browserLang_i18nSupport";
import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import sv from "react-intl/locale-data/sv";

// utils to check support or compatibility 
import polyfillElClosest_EI from "../app_utils/el.closest_IE_polyfill";

/* run all utils and set up the translation */
checkTranslationSupport();
polyfillElClosest_EI();
addLocaleData([...en, ...sv]);

/* render reactIndex.js */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <Provider store={initStore}>
    <App />
  </Provider>,
  initDomTarget,
  initContainer
);
