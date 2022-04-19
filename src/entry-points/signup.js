// URL.searchParams polyfill
import urlsearch from "@ungap/url-search-params";
import { getCodeStatus } from "actions/CodeVerified";
import { getSignupConfig } from "actions/SignupMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import SignupMainContainer from "containers/SignupMain";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { signupStore } from "signup-init-app";
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
  const findCode = function (path) {
    const re = new RegExp("/code/(.+)$"),
      match = re.exec(path);
    if (match !== null) {
      return match[1];
    }
    return "";
  };

  const path = window.location.pathname;
  const code = findCode(path);
  if (code) {
    signupStore.dispatch(getCodeStatus(code));
  } else {
    signupStore.dispatch(getSignupConfig());
  }
};

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(signupStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={signupStore}>
    <SignupMainContainer />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
