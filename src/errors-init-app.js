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
import rootSaga from "./signup-root-saga";
import { createLogger } from "redux-logger";
import { Provider } from "react-intl-redux";
import { updateIntl } from "react-intl-redux";
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./signup-store";
import notifyAndDispatch from "./notify-middleware";
import { history } from "components/ErrorsMain";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Store */
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  eduIDApp,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      routerMiddleware(history),
      notifyAndDispatch,
      createLogger()
    )
  )
);

sagaMiddleware.run(rootSaga);

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
  ReactDOM.render(app, target);
};

export default init_app;
