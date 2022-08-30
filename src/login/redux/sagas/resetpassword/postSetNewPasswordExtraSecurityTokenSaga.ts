import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRootState } from "login-init-app";
import { call, put, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";

interface PostSetNewPasswordSecurityTokenResponse {
  message: string;
}

export function* postSetNewPasswordExtraSecurityToken() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url + "new-password-extra-security-token/";
  const data = {
    email_code: state.resetPassword.email_code,
    password: state.resetPassword.new_password,
    csrf_token: state.config.csrf_token,
    ...state.resetPassword.webauthn_assertion,
  };
  try {
    const response: PayloadAction<PostSetNewPasswordSecurityTokenResponse, string, never, boolean> = yield call(
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
    yield put(resetPasswordSlice.actions.setGotoUrl("/reset-password/success"));
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  }
}
