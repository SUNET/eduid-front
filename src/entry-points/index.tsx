
import { requestAllPersonalData } from "apis/eduidPersonalData";
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
<<<<<<< HEAD
=======
const getConfig = async function () {
  indexStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));
  const result = await indexStore.dispatch(fetchJsConfig({ url: DASHBOARD_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(result)) {
    const response = await indexStore.dispatch(requestAllPersonalData());
    if (requestAllPersonalData.fulfilled.match(response)) {
      if (response.payload.language) {
        indexStore.dispatch(
          updateIntl({
            locale: response.payload.language,
            messages: LOCALIZED_MESSAGES[response.payload.language],
          })
        );
      }
      indexStore.dispatch(appLoadingSlice.actions.appLoaded());
    }
  }

  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        indexStore.dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        indexStore.dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
>>>>>>> 5faf489b7 (Changed  onClick to Link to avoid fetching JS script for help page)

const getConfig = async function () {

  indexStore.dispatch(fetchJsConfig({ url: SIGNUP_CONFIG_URL }));
  const result = await indexStore.dispatch(fetchJsConfig({ url: DASHBOARD_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(result)) {
    const response = await indexStore.dispatch(requestAllPersonalData());
    console.log("response", response);
    if (requestAllPersonalData.fulfilled.match(response)) {
      if (response.payload.language) {
        indexStore.dispatch(
          updateIntl({
            locale: response.payload.language,
            messages: LOCALIZED_MESSAGES[response.payload.language],
          })
        );
      }
      indexStore.dispatch(appLoadingSlice.actions.appLoaded());
    }
  }

  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        indexStore.dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        indexStore.dispatch(showNotification({ message: msg, level: "info" }));
      }
    }

  const config = await loginStore.dispatch(fetchJsConfig({ url: LOGIN_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(config)) {
    loginStore.dispatch(appLoadingSlice.actions.appLoaded());

};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(loginStore.dispatch);

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
