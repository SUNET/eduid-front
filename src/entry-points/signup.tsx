import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { SignupGlobalStateProvider } from "components/Signup/SignupGlobalState";
import SignupMain from "components/Signup/SignupMain";
import { SIGNUP_CONFIG_URL } from "globals";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { signupStore } from "signup-init-app";
import { setupLanguage } from "translation";
import "../../src/styles/index.scss";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  signupStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(signupStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <SignupGlobalStateProvider>
    <ReduxIntlProvider store={signupStore}>
      <BrowserRouter>
        <SignupMain />
      </BrowserRouter>
    </ReduxIntlProvider>
  </SignupGlobalStateProvider>,
  initDomTarget,
  getConfig
);
