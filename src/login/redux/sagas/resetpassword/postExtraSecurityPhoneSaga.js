import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { requestPhoneCodeFail } from "../../actions/postResetPasswordActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

export function fetchExtraSecurityPhone(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/extra-security-phone/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestPhoneCode() {
  try {
    const state = yield select(state => state);
    const data = {
      email_code: state.resetPassword.email_code,
      csrf_token: state.config.csrf_token,
      phone_index: state.resetPassword.phone_index,
    };
    yield put(eduidRMAllNotify());
    const resp = yield call(fetchExtraSecurityPhone, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, requestPhoneCodeFail(error));
  }
}
