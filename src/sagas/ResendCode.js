import { put, call, select } from "redux-saga/effects";
import { checkStatus, postRequest, putCsrfToken } from "sagas/common";

import * as actions from "actions/ResendCode";
import { history } from "components/SignupMain";
import { SIGNUP_SERVICE_URL } from "../globals";

export function* resendCode() {
  try {
    const state = yield select((state) => state),
      data = {
        email: state.email.email,
        csrf_token: state.config.csrf_token,
      };
    const resp = yield call(requestResendCode, data);
    yield put(putCsrfToken(resp));
    history.push("new");
    yield put(resp);
  } catch (error) {
    yield put(actions.postResendCodeFail(error.toString()));
  }
}

export function requestResendCode(data) {
  const signup_url = SIGNUP_SERVICE_URL + "resend-verification";
  return window
    .fetch(signup_url, {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}
