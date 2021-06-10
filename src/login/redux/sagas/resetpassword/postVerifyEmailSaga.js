import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postLinkCodeFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import * as app_actions from "../../../components/App/App_actions";

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
    if(state.resetPassword.code){
    const data = {
      email_code: state.resetPassword.code,
      csrf_token: state.config.csrf_token
    };
    const resp = yield call(requestSendLinkCode, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    yield put(app_actions.appLoaded());
      history.push(`/reset-password/`);
    }
  } catch (error) {
    yield put(app_actions.appLoaded());
    yield* failRequest(error, postLinkCodeFail(error));
  }
}
