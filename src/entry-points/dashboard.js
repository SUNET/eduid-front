import React from "react";
import ReactDOM from "react-dom";
import "./public-path";

// Polyfill for Element.closest for IE9+
// see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

if (!Element.prototype.matches)
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null);
    return null;
  };

// end Polyfill

// URL.searchParams polyfill
import urlsearch from "@ungap/url-search-params";
window.URLSearchParams = urlsearch;
// End polyfill

import DashboardMainContainer from "containers/DashboardMain";
import { AVAILABLE_LANGUAGES, LOCALIZED_MESSAGES } from "globals";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { updateIntl } from "reducers/Internationalisation";
import { dashboardStore } from "dashboard-init-app";
import * as configActions from "actions/DashboardConfig";
import { showNotification } from "reducers/Notifications";

/* Get configuration */
const getConfig = function () {
  const dispatch = dashboardStore.dispatch;
  dispatch(configActions.getConfig());
  let params = new URLSearchParams(document.location.search);
  if (params) {
    let msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        dispatch(showNotification({ message: msg.substr(7), level: "errors" }));
      } else {
        dispatch(showNotification({ message: msg, level: "messages" }));
      }
    }
  }
};

/* Get the language from the browser and initialise locale with the best match */
const language = navigator.languages ? navigator.languages[0] : navigator.language;
const supported = AVAILABLE_LANGUAGES.map((lang) => lang[0]);

if (supported.includes(language)) {
  const lang_code = language.substring(0, 2);
  dashboardStore.dispatch(
    updateIntl({
      locale: lang_code,
      messages: LOCALIZED_MESSAGES[lang_code],
    })
  );
}

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={dashboardStore}>
    <DashboardMainContainer />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
