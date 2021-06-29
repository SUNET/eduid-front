import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postLinkCodeFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

export function requestSendLinkCode(config, data) {
  return window
    .fetch(PASSWORD_SERVICE_URL + "/verify-email/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* useLinkCode() {
  try {
    const state = yield select(state => state);
    if(state.resetPassword.email_code){
    const data = {
      email_code: state.resetPassword.email_code,
      csrf_token: state.config.csrf_token
    };
    yield put(eduidRMAllNotify());
    const resp = yield call(requestSendLinkCode, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
      history.push(`/reset-password/`);
    }
  } catch (error) {
    yield put(eduidRMAllNotify());
    yield* failRequest(error, postLinkCodeFail(error));
  }
}
