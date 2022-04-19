import urlsearch from "@ungap/url-search-params";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { errorsStore } from "errors-init-app";
import { updateErrorsConfigData } from "login/redux/actions/errorsMainActions";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import ErrorsMain from "../login/components/SwamidErrors/ErrorsMain";
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
  errorsStore.dispatch(updateErrorsConfigData());
};

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(errorsStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={errorsStore}>
    <ErrorsMain />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
