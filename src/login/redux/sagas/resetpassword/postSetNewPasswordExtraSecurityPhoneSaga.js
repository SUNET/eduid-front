import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { setNewPasswordExtraSecurityPhoneFail } from "../../actions/postResetNewPasswordActions";

export function* postSetNewPasswordExtraSecurityPhone() {
  const url = PASSWORD_SERVICE_URL + "/new-password-extra-security-phone/";
  const state = yield select(state => state);
  const data = {
    email_code: state.resetPassword.email_code,
    phone_code: state.resetPassword.phone_code,
    password: state.resetPassword.suggested_password,
    csrf_token: state.config.csrf_token
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  }
  catch (error) {
    yield* failRequest(error, setNewPasswordExtraSecurityPhoneFail(error));
  }
}
