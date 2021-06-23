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
import { updateIntl } from "react-intl-redux";

// utils to check support or compatibility 
import polyfillElClosest_EI from "../app_utils/el.closest_IE_polyfill";

/* run all utils and set up the translation */
checkTranslationSupport();
polyfillElClosest_EI();
addLocaleData([...en, ...sv]);

const init_app = function(target, component) {
  let app, action;
  action = initContainer;
  const language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  const supported = AVAILABLE_LANGUAGES.map(lang => lang[0]);

  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    initStore.dispatch(
      updateIntl({
        locale: lang_code,
        messages: LOCALIZED_MESSAGES[lang_code]
      })
    );
  }
  app = <Provider store={initStore}>{component}</Provider>;
  ReactDOM.render(app, target, action);
};

init_app(document.getElementById("root"), <App />);
