import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { setNewPasswordFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";

export function* postSetNewPassword() {
  const url = PASSWORD_SERVICE_URL + "/new-password/";
  const state = yield select(state => state);
  const data = {
    email_code: state.resetPassword.email_code,
    password: state.resetPassword.suggested_password,
    csrf_token: state.config.csrf_token
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if(resp.type === "POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS"){
      return history.push(`/reset-password/success`);
    }
  }
  catch (error) {
    yield* failRequest(error, setNewPasswordFail(error));
  }
}
