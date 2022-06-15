import { PayloadAction } from "@reduxjs/toolkit";
import { loginHistory } from "entry-points/login";
import { LoginRootState } from "login-init-app";
import { call, put, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";

interface PostSetNewPasswordExternalMfaResponse {
  message: string;
}

export function* postSetNewPasswordExternalMfa() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url + "new-password-extra-security-external-mfa/";
  const data = {
    email_code: state.resetPassword.email_code,
    password: state.resetPassword.new_password,
    csrf_token: state.config.csrf_token,
  };
  try {
    const response: PayloadAction<PostSetNewPasswordExternalMfaResponse, string, never, boolean> = yield call(
      postRequest,
      url,
      data
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    loginHistory.push(`/reset-password/success`);
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  }
}
