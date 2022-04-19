import urlsearch from "@ungap/url-search-params";
import * as configActions from "actions/DashboardConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import DashboardMainContainer from "containers/DashboardMain";
import { dashboardStore } from "dashboard-init-app";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { showNotification } from "reducers/Notifications";
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

window.URLSearchParams = urlsearch;

/* Get configuration */
const getConfig = function () {
  const dispatch = dashboardStore.dispatch;
  dispatch(configActions.getConfig());
  let params = new URLSearchParams(document.location.search);
  if (params) {
    let msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
};

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(dashboardStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={dashboardStore}>
    <DashboardMainContainer />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
