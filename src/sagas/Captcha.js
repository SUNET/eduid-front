import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  putCsrfToken
} from "sagas/common";

import * as actions from "actions/Captcha";
import { history } from "components/SignupMain";

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

export function* sendCaptcha() {
  try {
    const state = yield select(state => state),
      data = {
        email: state.email.email,
        recaptcha_response: state.captcha.captcha_verification,
        csrf_token: state.config.csrf_token,
        tou_accepted: state.email.tou_accepted
      };
      
    //await sleep(10000);
    const resp = yield call(requestSendCaptcha, data);
    yield put(putCsrfToken(resp));
    history.push(resp.payload.next);
    delete resp.payload.next;
    yield put(resp);
  } catch (error) {
    yield put(actions.postCaptchaFail(error.toString()));
  }
}

export function requestSendCaptcha(data) {
  const signup_url = SIGNUP_SERVICE_URL + "trycaptcha";
  return window
    .fetch(signup_url, {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
