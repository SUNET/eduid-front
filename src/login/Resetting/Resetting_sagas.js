import { put, select, call } from "redux-saga/effects";
import {
  postRequest,
  checkStatus,
  failRequest,
  putCsrfToken
} from "sagas/common";
import * as actions from "login/Resetting/Resetting_actions";
import { history } from "login/LoginMain/LoginMain";


export function* postExtrasecWithSMSCode() {
  try {
    const state = yield select(state => state);
    const config = state.config,
      data = {
        code: state.config.email_code,
        phone_index: state.resetting.extrasec_phone_index,
        csrf_token: state.config.csrf_token,
      };
    const resp = yield call(requestExtrasecSMS, config, data);
    yield put(putCsrfToken(resp));
    history.push('/reset-password/choose/');
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.extrasecWithSMSCodeFail);
  }
}


export function requestExtrasecSMS(config, data) {
  return window
    .fetch(config.password_service_url + "reset/extra-security-phone/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}