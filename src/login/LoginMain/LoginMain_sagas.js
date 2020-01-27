import { put, call } from "redux-saga/effects";
import { ajaxHeaders,
         checkStatus,
         getRequest } from "sagas/common";

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
