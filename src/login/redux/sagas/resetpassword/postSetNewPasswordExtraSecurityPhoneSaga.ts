import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import { history } from "../../../components/App/App";
import { LoginRootState } from "../../../app_init/initStore";
import { PayloadAction } from "@reduxjs/toolkit";

interface PostSetNewPasswordExtraPhoneResponse {
  message: string;
}

export function* postSetNewPasswordExtraSecurityPhone() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url + "new-password-extra-security-phone/";
  const data = {
    email_code: state.resetPassword.email_code,
    phone_code: state.resetPassword.phone.phone_code,
    password: state.resetPassword.new_password,
    csrf_token: state.config.csrf_token,
  };
  try {
    const response: PayloadAction<PostSetNewPasswordExtraPhoneResponse, string, never, boolean> = yield call(
      postRequest,
      url,
      data
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      history.push(`/reset-password/email`);
      return;
    }
    history.push(`/reset-password/success`);
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  }
}
