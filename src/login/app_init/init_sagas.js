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
import { getResetPasswordDataFail, postEmailFail } from "./../redux/actions/resetPasswordActions";

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

export function* getResetPasswordData() {
  const url = PASSWORD_SERVICE_URL + "/";
  try {
    const reponse = yield call(getData, url);
    yield put(reponse);
  } catch (error) {
    yield put(getResetPasswordDataFail(error.toString()));
  }
}

export function getData(url) {
  const request = {
    ...getRequest,
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function fetchConfigResetPassword(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* postEmail() {
  try {
    const state = yield select(state => state);
    const data = {
      email: state.resetPassword.email,
      csrf_token: state.resetPassword.csrf_token
    };
    const resp = yield call(fetchConfigResetPassword, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if (resp.type.endsWith("SUCCESS")) {
      yield put(push("verify-email"));
    }
  } catch (error) {
    yield* failRequest(error, postEmailFail(error));
  }
}
