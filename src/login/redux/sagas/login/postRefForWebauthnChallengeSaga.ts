import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";
import { LoginRootState } from "../../../app_init/initStore";
import { PayloadAction } from "@reduxjs/toolkit";

export type MfaAuthResponse = {
  // The response from the /mfa_auth API endpoint consists of (in the happy case):
  //   finished: true if backend thinks mfa_auth requirement is satisfied
  //   webauthn_options: base64-encoded webauthn challenge to pass to navigator.credentials.get()
  finished: boolean;
  webauthn_options?: string;
};

// Saga to get a webauthn challenge from the /mfa_auth endpoint.
export function* postRefForWebauthnChallengeSaga() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
  };
  try {
    const response: PayloadAction<MfaAuthResponse, string, never, boolean> =
      yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    if (response.payload.finished) {
      yield put(loginSlice.actions.callLoginNext());
    }
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(loginSlice.actions.addMfaAuthWebauthnChallenge(response.payload));
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail());
  }
}
