import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postLinkCodeFail, selectExtraSecurity } from "../../actions/postResetPasswordActions";
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
  const state = yield select(state => state);
  const url = document.location.href;
  if(state.resetPassword.email_code){
    const data = {
      email_code: state.resetPassword.email_code,
      csrf_token: state.config.csrf_token
    };
    try {
      const encodedWebauthnChallenge = yield call(requestSendLinkCode, state.config, data);
      const decodedWebauthnChallenge = mfaDecodeMiddlewareForResetPassword(encodedWebauthnChallenge);
      yield put(putCsrfToken(decodedWebauthnChallenge));
      yield put(decodedWebauthnChallenge);
      if(url.includes("set-new-password")){
        return history.push(`/reset-password/set-new-password/${data.email_code}`),
        yield put(selectExtraSecurity("freja"));
      }else if(decodedWebauthnChallenge && decodedWebauthnChallenge.type === "POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS") {
        return history.push(`/reset-password/extra-security/${data.email_code}`);
      }else return history.push(`/reset-password/email/`);
    }
    catch (error) {
      yield* failRequest(error, postLinkCodeFail(error));
    }
  }
}
