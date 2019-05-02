/*
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import React from "react";
import ReactDOM from "react-dom";

import createSagaMiddleware from "redux-saga";
import { Provider } from "react-intl-redux";
import { updateIntl } from "react-intl-redux";
import { createStore, applyMiddleware, compose } from "redux";

import notifyAndDispatch from "./notify-middleware";
import { eduidNotify } from "actions/Notifications";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function init_plugin(app, rootSaga, target, component, action) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    app,
    composeEnhancers(applyMiddleware(sagaMiddleware, notifyAndDispatch))
  );

  sagaMiddleware.run(rootSaga);

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

  const afterRendering = () => {
    store.dispatch(action);
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

  app = <Provider store={store}>{component}</Provider>;
  ReactDOM.render(app, target, afterRendering);
}

export default init_plugin;
