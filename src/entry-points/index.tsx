import { fetchJsConfig } from "apis/eduidJsConfig";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { IndexMain } from "components/IndexMain";
import { ResetPasswordGlobalStateProvider } from "components/ResetPassword/ResetPasswordGlobalState";
import { SignupGlobalStateProvider } from "components/Signup/SignupGlobalState";
import { eduidStore } from "eduid-init-app";
import { SIGNUP_CONFIG_URL } from "globals";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { setupLanguage } from "translation";
import "../../src/styles/index.scss";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  eduidStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(eduidStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <SignupGlobalStateProvider>
    <ResetPasswordGlobalStateProvider>
      <ReduxIntlProvider store={eduidStore}>
        <BrowserRouter>
          <IndexMain />
        </BrowserRouter>
      </ReduxIntlProvider>
    </ResetPasswordGlobalStateProvider>
  </SignupGlobalStateProvider>,
  initDomTarget,
  getConfig
);
