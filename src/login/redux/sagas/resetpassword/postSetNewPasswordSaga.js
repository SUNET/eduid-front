import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import { history } from "../../../components/App/App";

export function* postSetNewPassword() {
  const state = yield select((state) => state);
  const url = state.config.reset_password_url + "new-password/";
  const data = {
    email_code: state.resetPassword.email_code,
    password: state.resetPassword.new_password,
    csrf_token: state.config.csrf_token,
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if (resp.type === "POST_RESET_PASSWORD_NEW_PASSWORD_SUCCESS") {
      return history.push(`/reset-password/success`);
    }
  } catch (error) {
    yield* failRequest(
      error,
      resetPasswordSlice.actions.resetPasswordSagaFail(error)
    );
  }
}
