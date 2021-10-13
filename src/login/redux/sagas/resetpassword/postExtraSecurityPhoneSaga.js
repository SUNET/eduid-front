import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { resetPasswordSagaFail } from "../../slices/resetPasswordSlice";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import {
  LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
  countFiveMin,
  clearCountdown,
  setLocalStorage,
} from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import { history } from "../../../components/App/App";

export function* requestPhoneCodeForNewPassword() {
  const state = yield select((state) => state);
  console.log("state", state.resetPassword);
  const url = state.config.reset_password_url + "extra-security-phone/";
  const locationUrl = document.location.href;
  const data = {
    email_code: state.resetPassword.email_code,
    csrf_token: state.config.csrf_token,
    phone_index: state.resetPassword.phone.index,
  };
  try {
    yield put(eduidRMAllNotify());
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if (resp.type === "POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_SUCCESS") {
      clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE);
      setLocalStorage(
        LOCAL_STORAGE_PERSISTED_COUNT_RESEND_PHONE_CODE,
        new Date().getTime() + 300000
      );
      countFiveMin("phone");
      history.push(`/reset-password/phone-code-sent/${data.email_code}`);
    } else if (resp.type === "POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL") {
      if (locationUrl.includes("extra-security")) {
        history.push(`/reset-password/extra-security/${data.email_code}`);
      } else if (locationUrl.includes("phone-code-sent")) {
        history.push(`/reset-password/phone-code-sent/${data.email_code}`);
      }
    }
  } catch (error) {
    yield* failRequest(error, resetPasswordSagaFail(error));
  }
}
