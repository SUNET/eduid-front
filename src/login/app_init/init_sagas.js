import { push } from "react-router-redux";
import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  getRequest,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../sagas/common";

import * as init_actions from "./init_actions";
import * as app_actions from "../components/App/App_actions";

export function* requestConfig() {
  try {
    console.log("Getting config from " + LOGIN_CONFIG_URL);
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

export function fetchConfigLinkCode(config, data) {
  console.log("this is data in the saga (fetch):", data);
  return window
    .fetch(PASSWORD_SERVICE_URL + "/reset/config/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* useLinkCode(code) {
  try {
    const state = yield select(state => state);
    const data = {
      code: code.payload.code,
      csrf_token: state.config.csrf_token
    };
    const resp = yield call(fetchConfigLinkCode, state.config, data);
    console.log("this is resp in the saga:", resp);
    yield put(putCsrfToken(resp));
    yield put(resp);
    yield put(app_actions.appLoaded());
    yield put(push("/reset/reset-password/check-user-details"));
  } catch (error) {
    yield put(app_actions.appLoaded());
    yield* failRequest(error, init_actions.postLinkCodeFail);
  }
}

// const getData = state => ({
//   email: state.getEmailLink.email,
//   csrf_token: state.config.csrf_token
// });

// export function requestConfigFromCode(config, data) {
//   return window
//     .fetch(PASSWORD_SERVICE_URL + "/reset/config/", {
//       ...postRequest,
//       body: JSON.stringify(data)
//     })
//     .then(checkStatus)
//     .then(response => response.json());
// }

// export function* getConfigFromCode() {
//   try {
//     const state = yield select(state => state),
//       data = {
//         code: document.location.href.split('/').reverse()[0],
//         csrf_token: state.config.csrf_token,
//       };
//     const resp = yield call(requestConfigFromCode, state.config, data);
//     yield put(putCsrfToken(resp));
//     yield put(resp);
//     yield put(actions.appLoaded());
//   } catch (error) {
//     yield put(actions.appLoaded());
//     yield* failRequest(error, actions.postCodeFail);
//   }
// }
