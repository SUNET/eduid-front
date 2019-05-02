import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  saveData,
  failRequest
} from "sagas/common";
import * as actions from "actions/Mobile";

const getData = state => ({
  number: state.phones.phone,
  verified: false,
  primary: false,
  csrf_token: state.config.csrf_token
});

export function sendMobile(config, data) {
  return window
    .fetch(config.MOBILE_URL + "new", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export const saveMobile = saveData(
  getData,
  "phones",
  data => ({ type: "NOOP_ACTION" }),
  sendMobile,
  actions.postMobileFail
);

export function* requestResendMobileCode() {
  try {
    const state = yield select(state => state),
      data = {
        number: state.phones.confirming,
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestResend, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.resendMobileCodeFail);
  }
}

export function requestResend(config, data) {
  return window
    .fetch(config.MOBILE_URL + "resend-code", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestVerifyMobile() {
  try {
    const state = yield select(state => state),
      data = {
        number: state.phones.confirming,
        code: state.phones.code,
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestVerify, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.startVerifyFail);
  }
}

export function requestVerify(config, data) {
  return window
    .fetch(config.MOBILE_URL + "verify", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestRemoveMobile() {
  try {
    const state = yield select(state => state),
      data = {
        number: state.phones.phone,
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestRemove, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.startRemoveFail);
  }
}

export function requestRemove(config, data) {
  return window
    .fetch(config.MOBILE_URL + "remove", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestMakePrimaryMobile() {
  try {
    const state = yield select(state => state),
      data = {
        number: state.phones.phone,
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestMakePrimary, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.makePrimaryFail);
  }
}

export function requestMakePrimary(config, data) {
  return window
    .fetch(config.MOBILE_URL + "primary", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
