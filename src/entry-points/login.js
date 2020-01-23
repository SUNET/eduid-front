import "babel-polyfill";

// Polyfill for Element.closest for IE9+
// see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest

if (!Element.prototype.matches)
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function(s) {
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

window.URLSearchParams = require("url-search-params");

// End polyfill

import React from "react";
import { addLocaleData } from "react-intl";

import init_app from "login-init-app";
import LoginMainContainer from "login/LoginMain/LoginMain_container";

import en from "react-intl/locale-data/en";
import sv from "react-intl/locale-data/sv";

addLocaleData([...en, ...sv]);

init_app(document.getElementById("root"), <LoginMainContainer />);
