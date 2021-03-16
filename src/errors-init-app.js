import React from "react";
import ReactDOM from "react-dom";

import { routerMiddleware } from "react-router-redux";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./errors-root-saga";
import { createLogger } from "redux-logger";
import { Provider } from "react-intl-redux";
import { updateIntl } from "react-intl-redux";
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./errors-store";
import notifyAndDispatch from "./notify-middleware";
import { history } from "components/ErrorsMain";
import { updateAvailableLanguage } from "actions/ErrorsMain";

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

const initState = function() {
  store.dispatch(updateAvailableLanguage());
};

/* render app */
const init_app = function(target, component) {
  let action;
  action = initState;
  const language = navigator.languages
    ? navigator.languages[0]
    : navigator.language || navigator.userLanguage;
  const supported = AVAILABLE_LANGUAGES.map(lang => lang[0]);
  if (supported.includes(language)) {
    const lang_code = language.substring(0, 2);
    console.log("lang_code", lang_code)
    store.dispatch(
      updateIntl({
        locale: lang_code,
        messages: LOCALIZED_MESSAGES[lang_code]
      })
    );
  }
  const app = <Provider store={store}>{component}</Provider>;
  ReactDOM.render(app, target, action);
};

export default init_app;
