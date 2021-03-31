import { put, call } from "redux-saga/effects";
import { checkStatus, getRequest } from "sagas/common";
import * as actions from "../actions/errorsMainActions";

export function* requestConfig() {
  try {
    const config = yield call(fetchConfig, "/errors");
    yield put(config);
    yield put(actions.updateErrorsConfigData());
  } catch (error) {
    yield put(actions.updateErrorsConfigDataFail(error.toString()));
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
