import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { resetPasswordSagaFail } from "../../actions/resetPasswordActions";
import { history } from "../../../components/App/App";

export function* postSetNewPasswordExtraSecurityPhone() {
  const state = yield select(state => state);
  const url = state.config.reset_password_url + "new-password-extra-security-phone/";
  const data = {
    email_code: state.resetPassword.email_code,
    phone_code: state.resetPassword.phone.phone_code,
    password: state.resetPassword.new_password,
    csrf_token: state.config.csrf_token
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if(resp.type === "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_PHONE_SUCCESS"){
      return history.push(`/reset-password/success`);
    }else {
      return history.push(`/reset-password/email`);
    }
  }
  catch (error) {
    yield* failRequest(error, resetPasswordSagaFail(error));
  }
}
