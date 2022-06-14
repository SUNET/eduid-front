import { fetchJsConfig } from "apis/eduidJsConfig";
import { DashboardMain } from "components/DashboardMain";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { dashboardStore } from "dashboard-init-app";
import { DASHBOARD_CONFIG_URL } from "globals";
import { createBrowserHistory } from "history";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import { showNotification } from "reducers/Notifications";
import { getInitialUserData } from "sagas/PersonalData";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = async function () {
  const result = await dashboardStore.dispatch(fetchJsConfig({ url: DASHBOARD_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(result)) {
    dashboardStore.dispatch(getInitialUserData());
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

export const dashboardHistory = createBrowserHistory();

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={dashboardStore}>
    <Router history={dashboardHistory}>
      <DashboardMain />
    </Router>
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
