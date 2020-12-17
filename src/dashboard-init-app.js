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
import { Provider } from "react-intl-redux";
import { updateIntl } from "react-intl-redux";
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./dashboard-store";
import notifyAndDispatch from "./notify-middleware";
import * as configActions from "actions/DashboardConfig";
import { eduidNotify } from "actions/Notifications";

import { history } from "components/DashboardMain";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* to load persisted state from local storage */

// const loadPersistedState = () => {
//   try {
//     const serializedState = localStorage.getItem("eduid-state");
//     if (serializedState === null) {
//       return undefined;
//     }
//     return {
//       ...JSON.parse(serializedState),
//       notifications: {
//         errors: [],
//         messages: []
//       }
//     };
//   } catch (err) {
//     return undefined;
//   }
// };

// const saveState = state => {
//   try {
//     const serialized = JSON.stringify(state);
//     localStorage.setItem("eduid-state", serialized);
//   } catch (err) {
//     console.log("Cannot save the state: ", err);
//   }
// };

/* Store */

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  eduIDApp,
  //    loadPersistedState(),
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
      notifyAndDispatch,
      createLogger()
    )
  )
);

//store.subscribe(() => {
//  saveState(store.getState());
//});

sagaMiddleware.run(rootSaga);

/* Get configuration */

const getConfig = function() {
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

const init_app = function(target, component) {
  const language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  const supported = AVAILABLE_LANGUAGES.map(lang => lang[0]);

  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    store.dispatch(
      updateIntl({
        locale: lang_code,
        messages: LOCALIZED_MESSAGES[lang_code]
      })
    );
  }
  const app = <Provider store={store}>{component}</Provider>;
  
  ReactDOM.render(app, target, getConfig);
};

export default init_app;
