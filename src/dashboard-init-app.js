/*
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import React from "react";
import ReactDOM from "react-dom";

import { routerMiddleware } from "react-router-redux";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./dashboard-root-saga";
import { createLogger } from "redux-logger";
import { ReduxIntlProvider } from "components/ReduxIntl";
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./dashboard-store";
import notifyAndDispatch from "./notify-middleware";
import * as configActions from "actions/DashboardConfig";
import { eduidNotify } from "actions/Notifications";
import { updateIntl } from "./reducers/Internationalisation";

import { history } from "components/DashboardMain";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  eduIDApp,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history), notifyAndDispatch, createLogger()))
);

sagaMiddleware.run(rootSaga);

/* Get configuration */

const getConfig = function () {
  store.dispatch(configActions.getConfig());
  let params = new URLSearchParams(document.location.search);
  if (params) {
    let msg = params.get("msg");
    if (msg !== null) {
      if (msg.indexOf(":ERROR:") === 0) {
        store.dispatch(eduidNotify(msg.substr(7), "errors"));
      } else {
        store.dispatch(eduidNotify(msg, "messages"));
      }
    }
  }
};

/* render app */

const init_app = function (target, component) {
  const language = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
  const supported = AVAILABLE_LANGUAGES.map((lang) => lang[0]);

  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    store.dispatch(
      updateIntl({
        locale: lang_code,
        messages: LOCALIZED_MESSAGES[lang_code],
      })
    );
  }
  const app = <ReduxIntlProvider store={store}>{component}</ReduxIntlProvider>;

  ReactDOM.render(app, target, getConfig);
};

export default init_app;
