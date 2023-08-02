import { fetchJsConfig } from "apis/eduidJsConfig";
import { LoginMain } from "components/Login/LoginMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { ResetPasswordGlobalStateProvider } from "components/ResetPassword/ResetPasswordGlobalState";
import { LOGIN_CONFIG_URL } from "globals";
import { loginStore } from "login-init-app";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { appLoadingSlice } from "slices/AppLoading";
import { setupLanguage } from "translation";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = async function () {
  console.log("Initializing state for the login app...");
  const config = await loginStore.dispatch(fetchJsConfig({ url: LOGIN_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(config)) {
    loginStore.dispatch(appLoadingSlice.actions.appLoaded());
  }
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(loginStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ResetPasswordGlobalStateProvider>
    <ReduxIntlProvider store={loginStore}>
      <BrowserRouter>
        <LoginMain />
      </BrowserRouter>
    </ReduxIntlProvider>
  </ResetPasswordGlobalStateProvider>,
  initDomTarget,
  getConfig
);
