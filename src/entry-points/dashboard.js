import * as configActions from "actions/DashboardConfig";
import { ReduxIntlProvider } from "components/ReduxIntl";
import DashboardMainContainer from "containers/DashboardMain";
import { dashboardStore } from "dashboard-init-app";
import { setupLanguage } from "login/translation";
import React from "react";
import ReactDOM from "react-dom";
import { showNotification } from "reducers/Notifications";
import { polyfillsInit } from "./polyfills-common";
import "./public-path";

/* Get configuration */
const getConfig = function () {
  const dispatch = dashboardStore.dispatch;
  dispatch(configActions.getConfig());
  let params = new URLSearchParams(document.location.search);
  if (params) {
    let msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        dispatch(showNotification({ message: msg, level: "info" }));
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
    <DashboardMainContainer />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
