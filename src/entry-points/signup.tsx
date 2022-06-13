import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import SignupMain from "components/SignupMain";
import { SIGNUP_CONFIG_URL } from "globals";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { signupStore } from "signup-init-app";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  //  signupStore.dispatch(getSignupConfig());

  signupStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));

  // const findCode = function (path: string) {
  //   const re = new RegExp("/code/(.+)$"),
  //     match = re.exec(path);
  //   if (match !== null) {
  //     return match[1];
  //   }
  //   return "";
  // };

  // const path = window.location.pathname;
  // const code = findCode(path);
  // if (code) {
  //   signupStore.dispatch(getCodeStatus(code));
  // } else {
  //   signupStore.dispatch(getSignupConfig());
  // }
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(signupStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={signupStore}>
    <SignupMain />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
