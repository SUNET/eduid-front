import { put, call } from "redux-saga/effects";
import { checkStatus, getRequest } from "sagas/common";
import * as actions from "actions/ErrorsMain";

export function* requestConfig() {
  try {
    const config = yield call(fetchConfig, "/errors");
    yield put(config);
    yield put(actions.updateAvailableLanguage());
  } catch (error) {
    yield put(actions.updateAvailableLanguageFail(error.toString()));
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
