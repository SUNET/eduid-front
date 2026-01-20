import { jsConfigApi } from "apis/eduidJsConfig";
import personalDataApi from "apis/eduidPersonalData";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { IndexMain } from "components/IndexMain";
import { eduidStore } from "eduid-init-app";
import { LOCALIZED_MESSAGES } from "globals";
import Raven from "raven-js";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router";
import { appLoadingSlice } from "slices/AppLoading";
import { updateIntl } from "slices/Internationalisation";
import { showNotification } from "slices/Notifications";
import { setupLanguage } from "translation";
import "../../src/styles/index.scss";
import "./public-path";

function showErrorMsg() {
  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.startsWith(":ERROR:")) {
        eduidStore.dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        eduidStore.dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
}

const getConfig = async function () {
  const jsConfig_promise = eduidStore.dispatch(jsConfigApi.endpoints.fetchJsConfig.initiate());
  const jsConfig = await jsConfig_promise;
  if (jsConfig.isSuccess) {
    if (jsConfig.data.payload.sentry_dsn) {
      Raven.config(jsConfig.data.payload.sentry_dsn as string).install();
    }
    if (window.location.href.includes("/profile/")) {
      const personalData_promise = eduidStore.dispatch(personalDataApi.endpoints.requestAllPersonalData.initiate());
      const personalData = await personalData_promise;
      if (personalData.isSuccess) {
        if (personalData.data.payload.language) {
          eduidStore.dispatch(
            updateIntl({
              locale: personalData.data.payload.language,
              messages: LOCALIZED_MESSAGES[personalData.data.payload.language],
            })
          );
        }
        eduidStore.dispatch(appLoadingSlice.actions.appLoaded());
      }
    }
    showErrorMsg();
  }
};

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(eduidStore.dispatch);

/**
 * Handle Back/Forward Cache (bfcache).
 * If the page is restored from the cache (e.g. user navigated back after logout),
 * this forces a reload. Since the session is cleared, the app will re-init
 * in an unauthenticated state.
 */
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    const state = eduidStore.getState();
    if (state.config.is_configured === false) {
      // The app was restored from bfcache and is not configured, reload to init properly
      window.location.reload();
    }
  }
});

/* render app */
const initDomTarget = document.getElementById("root");
if (initDomTarget === null) {
  throw new Error("No root element found");
}
const root = ReactDOMClient.createRoot(initDomTarget);
root.render(
  <ReduxIntlProvider store={eduidStore}>
    <BrowserRouter>
      <IndexMain />
    </BrowserRouter>
  </ReduxIntlProvider>
);
getConfig();
