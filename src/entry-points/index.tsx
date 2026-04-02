import { jsConfigApi } from "apis/eduidJsConfig";
import personalDataApi from "apis/eduidPersonalData";
import { ReduxIntlProvider } from "components/Common/ReduxIntl";
import { IndexMain, SETTINGS_PATHS } from "components/IndexMain";
import { eduidStore } from "eduid-init-app";
import { LOCALIZED_MESSAGES } from "globals";
import Raven from "raven-js";
import ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router";
import indexSlice from "slices/IndexConfig";
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
        eduidStore.dispatch(showNotification({ message: msg.substring(7), level: "error" }));
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
    const isSettings = SETTINGS_PATHS.some((path) => globalThis.location.href.includes(path));

    if (isSettings) {
      const personalData_promise = eduidStore.dispatch(personalDataApi.endpoints.requestAllPersonalData.initiate());
      const personalData = await personalData_promise;
      if (personalData.isSuccess) {
        if (personalData.data.payload.language) {
          eduidStore.dispatch(
            updateIntl({
              locale: personalData.data.payload.language,
              messages: LOCALIZED_MESSAGES[personalData.data.payload.language],
            }),
          );
        }
        eduidStore.dispatch(indexSlice.actions.appLoaded());
      }
    }
    showErrorMsg();
  }
};

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(eduidStore.dispatch);

/**
 * Handle Back/Forward Cache (bfcache).
 * Always reload when the page is restored from bfcache. The previous check
 * (is_configured === false) was insufficient because after a successful login,
 * is_configured is true in the cached state — so bfcache restores would keep
 * stale Redux state (including is_app_loaded: true) even when the session has
 * expired. This caused the dashboard to render without a spinner and fire
 * parallel API calls (credentials, letter-proofing) that all got 401s,
 * each independently triggering re_authenticate() and causing SessionOutOfSync.
 */
globalThis.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    globalThis.location.reload();
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
  </ReduxIntlProvider>,
);
getConfig();
