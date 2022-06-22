import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { LoginRootState } from "login-init-app";
import { call, put, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import {
  clearCountdown,
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK,
  setLocalStorage,
} from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import { requestCompleted, requestInProgress } from "../../actions/loadingDataActions";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";

interface PostEmailLinkResponse {
  email: string;
}

export function* postEmailLink() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url;
  const data = {
    email: state.resetPassword.email_address,
    csrf_token: state.config.csrf_token,
  };
  try {
    yield put(requestInProgress());
    const response: PayloadAction<PostEmailLinkResponse, string, never, boolean> = yield call(postRequest, url, data);
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    // clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
    // setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK, new Date().getTime() + 60 * 5 * 1000);
    // countFiveMin("email");
    // yield put(resetPasswordSlice.actions.setGotoUrl("/reset-password/email-link-sent"));
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  } finally {
    yield put(requestCompleted());
  }
}
