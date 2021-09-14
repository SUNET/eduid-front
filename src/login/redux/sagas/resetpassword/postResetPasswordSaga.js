import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { postEmailLinkFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { countRealTime } from "../../../components/LoginApp/ResetPassword/CountDownTimer";

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
      window.localStorage.removeItem("REALTIME");
      window.localStorage.setItem("REALTIME", new Date().getTime() + 301000);
      countRealTime();
      history.push(`/reset-password/email-link-sent`);
    }
  } catch (error) {
    yield* failRequest(error, postEmailLinkFail(error));
  }
}
