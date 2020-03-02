
import { put, call, select } from "redux-saga/effects";
import { checkStatus,
         putCsrfToken,
         postRequest,
         getRequest,
         failRequest } from "sagas/common";

import * as actions from "login/LoginMain/LoginMain_actions";


export function* requestLoginConfig() {
  try {
    console.log("Getting config from " + LOGIN_CONFIG_URL);
    const config = yield call(fetchLoginConfig, LOGIN_CONFIG_URL);
    yield put(config);
    // On successfully receiving config from the backend,
    // signal that the app has successfuly loaded
    yield put(actions.appLoaded());
  } catch (error) {
    yield put(actions.getLoginConfigFail(error.toString()));
  }
}

export function fetchLoginConfig(url) {
  const request = {
    ...getRequest,
    redirect: "follow"
  };
  return window
    .fetch(url, {
      ...request
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function requestConfigFromCode(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/reset/config/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

// grab the code from the URL and POST it to the backend to get configuration data.
export function* getConfigFromCode() {
  try {
    const state = yield select(state => state),
      data = {
        code: document.location.href.split('/').reverse()[0],
        csrf_token: state.config.csrf_token,
      };
    const resp = yield call(requestConfigFromCode, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    yield put(actions.appLoaded());
  } catch (error) {
    yield put(actions.appLoaded());
    yield* failRequest(error, actions.postCodeFail);
  }
}
