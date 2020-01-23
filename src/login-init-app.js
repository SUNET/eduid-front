import React from "react";
import ReactDOM from "react-dom";
// store
import eduIDLoginApp from "./login-store";
// redux middleware
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import notifyAndDispatch from "./notify-middleware";
// i18n
import { Provider } from "react-intl-redux";
import { updateIntl } from "react-intl-redux";

/* for redux dev tools */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// build store
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  eduIDLoginApp,
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
      createLogger(),
      notifyAndDispatch,
    )
  )
);

sagaMiddleware.run(rootSaga);

/* Initial action */

const initState = function() {
  console.log('Initializing state for the login app...');
  // ...
};

/* render app */
const init_app = function(target, component) {
  // i18n
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
  // render component
  const app = <Provider store={store}>{component}</Provider>;
  ReactDOM.render(app, target, initState);
};

export default init_app;
