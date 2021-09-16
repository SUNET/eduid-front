import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { postEmailLinkFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { countFiveMin, LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK, clearCountdown, setLocalStorage } from "../../../components/LoginApp/ResetPassword/CountDownTimer";
import {
  requestInProgress,
  requestCompleted,
} from "../../actions/loadingDataActions";

export function* postEmailLink() {
  const state = yield select(state => state);
  const url = state.config.reset_password_url;
  const data = {
    email: state.resetPassword.email_address,
    csrf_token: state.config.csrf_token
  };
  try {
    yield put(requestInProgress());
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if (resp.type === "POST_RESET_PASSWORD_SUCCESS") {
      clearCountdown(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK);
      setLocalStorage(LOCAL_STORAGE_PERSISTED_COUNT_RESEND_LINK, new Date().getTime() + 300000);
      countFiveMin("email");
      history.push(`/reset-password/email-link-sent`);
    }
  } catch (error) {
    yield* failRequest(error, postEmailLinkFail(error));
  }
  finally {
    yield put(requestCompleted());
  }
}
