import { fetchJsConfig } from "apis/eduidJsConfig";
import { requestAllPersonalData } from "apis/eduidPersonalData";
import { DashboardMain } from "components/DashboardMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { dashboardStore } from "dashboard-init-app";
import { DASHBOARD_CONFIG_URL } from "globals";
import { setupLanguage } from "login/translation";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { appLoadingSlice } from "reducers/AppLoading";
import { showNotification } from "reducers/Notifications";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = async function () {
  const result = await dashboardStore.dispatch(fetchJsConfig({ url: DASHBOARD_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(result)) {
    const response = await dashboardStore.dispatch(requestAllPersonalData());
    if (requestAllPersonalData.fulfilled.match(response)) {
      dashboardStore.dispatch(appLoadingSlice.actions.appLoaded());
    }
  }

  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        dashboardStore.dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        dashboardStore.dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
};

/* Initialise common polyfills for missing browser functionality */
polyfillsInit();

/* Get the language from the browser and initialise locale with the best match */
setupLanguage(dashboardStore.dispatch);

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={dashboardStore}>
    <BrowserRouter>
      <DashboardMain />
    </BrowserRouter>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
