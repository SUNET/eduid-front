import { put, call, select } from "redux-saga/effects";
import { checkStatus, getRequest } from "sagas/common";

import * as actions from "actions/SignupMain";
import * as verifiedActions from "actions/CodeVerified";
import { history } from "components/SignupMain";
import { showNotification } from "reducers/Notifications";
import { SIGNUP_CONFIG_URL, SIGNUP_BASE_PATH, SIGNUP_SERVICE_URL } from "../globals";

export function* requestCodeStatus() {
  try {
    const state = yield select((state) => state),
      url = SIGNUP_SERVICE_URL + "verify-link/" + state.config.code;
    const codeStatus = yield call(fetchCodeStatus, url);
    yield* requestConfig();
    if (codeStatus.payload.status === "unknown-code") {
      history.push(SIGNUP_BASE_PATH + "/email");
      yield put(showNotification({ message: "code.unknown-code", level: "messages" }));
    } else if (codeStatus.payload.status === "already-verified") {
      history.push(SIGNUP_BASE_PATH + "/resend-code");
      yield put(showNotification({ message: "code.already-verified", level: "messages" }));
    } else if (codeStatus.payload.status === "verified") {
      yield put(codeStatus);
      history.push(SIGNUP_BASE_PATH + "/code-verified");
    }
  } catch (error) {
    yield put(verifiedActions.getCodeStatusFail(error.toString()));
  }
}

export function fetchCodeStatus(url) {
  return window
    .fetch(url, {
      ...getRequest,
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* requestConfig() {
  try {
    console.log("Getting config from " + SIGNUP_CONFIG_URL);
    const config = yield call(fetchConfig, SIGNUP_CONFIG_URL);
    yield put(config);
    yield put(actions.appLoaded());
  } catch (error) {
    yield put(actions.getSignupConfigFail(error.toString()));
  }
}

export function fetchConfig(url) {
  const request = {
    ...getRequest,
    redirect: "follow",
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}
