import { PayloadAction } from "@reduxjs/toolkit";
import { showNotification, clearNotifications } from "reducers/Notifications";
import { call, put, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import { LoginRootState } from "../../../app_init/initStore";
import { history } from "../../../components/App/App";
import {
  clearCountdown,
  countFiveMin,
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
  setLocalStorage,
} from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";

interface RequestPhoneCodeResponse {
  message: string;
}

export function* requestPhoneCodeForNewPassword() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url + "extra-security-phone/";
  const locationUrl = document.location.href;
  const data = {
    email_code: state.resetPassword.email_code,
    csrf_token: state.config.csrf_token,
    phone_index: state.resetPassword.phone.index,
  };
  try {
    yield put(clearNotifications());
    const response: PayloadAction<RequestPhoneCodeResponse, string, never, boolean> = yield call(
      postRequest,
      url,
      data
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      if (locationUrl.includes("extra-security")) {
        history.push(`/reset-password/extra-security/${data.email_code}`);
      } else if (locationUrl.includes("phone-code-sent")) {
        history.push(`/reset-password/phone-code-sent/${data.email_code}`);
      }
      return;
    }
    // Success message is showing in notification bar
    yield put(showNotification({ message: response.payload.message, level: "messages" }));
    clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
    setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE, new Date().getTime() + 300000);
    countFiveMin("phone");
    history.push(`/reset-password/phone-code-sent/${data.email_code}`);
  } catch (error) {
    yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
  }
}
