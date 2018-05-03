
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import { routerMiddleware } from 'react-router-redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-intl-redux'
import { updateIntl } from 'react-intl-redux';
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./store";

import { getConfig, getCodeStatus } from "actions/Main";
import { history } from "components/Main";


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
          createLogger()
          )
    )
);

sagaMiddleware.run(rootSaga);

/* render app */

const findCode = function (path) {
    const segments = path.split('/');
    if (segments.length === 5) {return segments[3]}
    return '';
};

const initState = function () {
    const path = window.location.pathname;
    const code = findCode(path);
    if (code) {
        store.dispatch(getCodeStatus(code));
    } else {
        store.dispatch(getConfig());
    }
};

const init_app = function (target, component) {
    let app, action;
    action = initState;
    const language = navigator.languages
                     ? navigator.languages[0]
                     : (navigator.language || navigator.userLanguage);
    const supported = AVAILABLE_LANGUAGES.map((lang) => (lang[0]))

    if (supported.includes(language)) {
        const lang_code = language.substring(0,2);
        store.dispatch(updateIntl({
            locale: lang_code,
            messages: LOCALIZED_MESSAGES[lang_code]
        }));
    }
    app = (
      <Provider store={store}>
          {component}
      </Provider>);
    ReactDOM.render(app, target, action);
};

export default init_app;
