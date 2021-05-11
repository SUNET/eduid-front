import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  getRequest,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { getResetPasswordDataFail, postEmailFail } from "../../actions/resetPasswordActions";

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
  } catch (error) {
    yield* failRequest(error, postEmailFail(error));
  }
}
