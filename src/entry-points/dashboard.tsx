import React from "react";
import ReactDOM from "react-dom";

import DashboardMainContainer from "containers/DashboardMain";
import { AVAILABLE_LANGUAGES, DASHBOARD_CONFIG_URL, LOCALIZED_MESSAGES } from "globals";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { updateIntl } from "reducers/Internationalisation";
import { dashboardStore } from "dashboard-init-app";
import * as configActions from "actions/DashboardConfig";
import { showNotification } from "reducers/Notifications";
import { fetchJsConfig } from "apis/eduidJsConfig";

// URL.searchParams polyfill
import urlsearch from "@ungap/url-search-params";
window.URLSearchParams = urlsearch;
// End polyfill

/* Get configuration */
async function getConfig() {
  const dispatch = dashboardStore.dispatch;

  const config = await dispatch(fetchJsConfig({ url: DASHBOARD_CONFIG_URL }));
  if (fetchJsConfig.fulfilled.match(config)) {
    dispatch(configActions.getInitialUserdata());
  }

  // Handle errors returned on the URL from the eidas SP, I think?
  const params = new URLSearchParams(document.location.search);
  if (params) {
    const msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        dispatch(showNotification({ message: msg.substr(7), level: "error" }));
      } else {
        dispatch(showNotification({ message: msg, level: "info" }));
      }
    }
  }
}

/* Get the language from the browser and initialise locale with the best match */
// TODO: This actually just checks the most preferred language in the browser. Not any secondary languages.
const language = navigator.languages ? navigator.languages[0] : navigator.language;
const supported = AVAILABLE_LANGUAGES.map((lang) => lang[0]);

if (supported.includes(language)) {
  type LocaleKey = keyof typeof LOCALIZED_MESSAGES;
  // TODO: what's this about? We just checked that 'language' was a known key - why substring it then?
  const lang_code = language.substring(0, 2);
  dashboardStore.dispatch(
    updateIntl({
      locale: lang_code,
      // lots of type hints needed, LOCALIZED_MESSAGES comes from .js land :/
      messages: LOCALIZED_MESSAGES[lang_code as LocaleKey] as { [key: string]: string },
    })
  );
}

/* render app */
const initDomTarget = document.getElementById("root");
ReactDOM.render(
  <ReduxIntlProvider store={dashboardStore}>
    <DashboardMainContainer />
  </ReduxIntlProvider>,
  initDomTarget,
  getConfig
);
