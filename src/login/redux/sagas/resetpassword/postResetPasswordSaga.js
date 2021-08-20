import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postEmailLinkFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { countDownStart, clearCountdown } from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import { loadingData, loadingDataComplete } from "../../actions/loadingDataActions";

export function fetchConfigResetPassword(config, data) {
  return window
    .fetch(config.reset_password_url + "/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* postEmailLink() {
  try {
    const state = yield select(state => state);
    const data = {
      email: state.resetPassword.email_address,
      csrf_token: state.config.csrf_token
    };
    yield put(loadingData());
    const resp = yield call(fetchConfigResetPassword, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(loadingDataComplete());
    yield put(resp);
    if (resp.type === "POST_RESET_PASSWORD_SUCCESS") {
      history.push(`/reset-password/email-link-sent`);
      clearCountdown();
      countDownStart();
    }
  } catch (error) {
    yield* failRequest(error, postEmailLinkFail(error));
    yield put(loadingDataComplete());
  }
}
