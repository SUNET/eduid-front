import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import { history } from "../../../components/App/App";
import {
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK,
  clearCountdown,
  setLocalStorage,
} from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import { requestInProgress, requestCompleted } from "../../actions/loadingDataActions";
import { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../../../app_init/hooks";

export type PostEmailLinkResponse = {
  email: string;
};

export function* postEmailLink() {
  const state = useAppSelector((state) => state);
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
    clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
    setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK, new Date().getTime() + 60 * 5 * 1000);
    countFiveMin("email");
    history.push(`/reset-password/email-link-sent`);
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  } finally {
    yield put(requestCompleted());
  }
}
