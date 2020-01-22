import { put, call } from "redux-saga/effects";
import { ajaxHeaders,
         checkStatus,
         getRequest,
         postRequest,
         saveData } from "sagas/common";

import * as actions from "login/LoginMain/LoginMain_actions";


export function* requestLoginConfig() {
  try {
    console.log("Getting config from " + LOGIN_CONFIG_URL);
    const config = yield call(fetchLoginConfig, LOGIN_CONFIG_URL);
    yield put(config);
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

const getData = state => ({
  code: document.location.href.split('/').reverse()[0],
  csrf_token: state.config.csrf_token
});

export const getConfigFromCode = saveData(
  getData,
  "config-reset-form",
  data => ({ type: "NOOP_ACTION" }),
  requestConfigFromCode,
  actions.postCodeFail
);
