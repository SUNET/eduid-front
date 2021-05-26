import { put, call } from "redux-saga/effects";
import {
  checkStatus,
  getRequest
} from "../../sagas/common";
import * as init_actions from "./init_actions";
import * as app_actions from "../components/App/App_actions";

export function* requestConfig() {
  try {
    const config = yield call(fetchConfig, LOGIN_CONFIG_URL);
    yield put(config);
    yield put(app_actions.appLoaded());
  } catch (error) {
    yield put(init_actions.getConfigFail(error.toString()));
  }
}

export function fetchConfig(url) {
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
