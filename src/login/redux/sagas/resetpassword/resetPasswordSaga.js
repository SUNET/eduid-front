import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  getRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postEmailLinkFail } from "../../actions/postResetPasswordActions";
import { getResetPasswordConfigFail } from "../../actions/getResetPasswordActions";
import { history } from "../../../components/App/App";
import { countDownStart } from "../../../components/LoginApp/ResetPassword/CountDownTimer"


export function* getResetPasswordConfig() {
  const url = PASSWORD_SERVICE_URL + "/";
  try {
    const reponse = yield call(fetchConfig, url);
    yield put(reponse);
  } catch (error) {
    yield put(getResetPasswordConfigFail(error.toString()));
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

export function fetchConfigResetPassword(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* postEmailLink() {
  try {
    const state = yield select(state => state);
    const data = {
      email: state.resetPassword.email,
      csrf_token: state.config.csrf_token
    };
    const resp = yield call(fetchConfigResetPassword, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if (resp.type === "POST_RESET_PASSWORD_SUCCESS") {
      history.push(`/reset-password/email-link-sent`);
      countDownStart();
    }
  } catch (error) {
    yield* failRequest(error, postEmailLinkFail(error));
  }
}
