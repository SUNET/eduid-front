import { put, call } from "redux-saga/effects";
import {
  checkStatus,
  getRequest,
  failRequest
} from "sagas/common";
import { getConfigFail } from "actions/DashboardConfig";

export function* requestConfig() {
  const input = document.getElementById("jsconfig_url"),
    jsconfig_url = input ? input.value : EDUID_CONFIG_URL;
  try {
    console.log("Getting config from " + jsconfig_url);
    const config = yield call(fetchConfig, jsconfig_url);
    yield put(config);
  } catch (error) {
    yield* failRequest(error, getConfigFail);
  }
}

export function fetchConfig(url) {
  return window
    .fetch(url, {
      ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json());
}
