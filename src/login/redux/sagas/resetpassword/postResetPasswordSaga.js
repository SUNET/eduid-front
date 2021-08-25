import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { postEmailLinkFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { countDownStart, clearCountdown } from "../../../components/LoginApp/ResetPassword/CountDownTimer";

export function* postEmailLink() {
  const state = yield select(state => state);
  const url = state.config.reset_password_url;
  const data = {
    email: state.resetPassword.email_address,
    csrf_token: state.config.csrf_token
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
      if (resp.type === "POST_RESET_PASSWORD_SUCCESS") {
        history.push(`/reset-password/email-link-sent`);
        clearCountdown();
        countDownStart();
      }
  } catch (error) {
    yield* failRequest(error, postEmailLinkFail(error));
  }
}
