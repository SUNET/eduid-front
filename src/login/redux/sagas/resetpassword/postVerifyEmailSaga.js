import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postLinkCodeFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import { mfaDecodeMiddlewareForResetPassword } from "../../../app_utils/helperFunctions/authenticatorAssertion";

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
    const encodedWebauthnChallenge = yield call(requestSendLinkCode, state.config, data);
    const decodedWebauthnChallenge = mfaDecodeMiddlewareForResetPassword(encodedWebauthnChallenge);
    yield put(putCsrfToken(decodedWebauthnChallenge));
    yield put(decodedWebauthnChallenge);
    if (decodedWebauthnChallenge.type === "POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS")
      history.push(`/reset-password/extra-security/${data.email_code}`);
    }else history.push(`/reset-password/email/`);
  } catch (error) {
    yield* failRequest(error, postLinkCodeFail(error));
  }
}
