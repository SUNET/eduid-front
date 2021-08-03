import { put, call, select } from "redux-saga/effects";
import {
  checkStatus,
  postRequest,
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import { postLinkCodeFail } from "../../actions/postResetPasswordActions";
import { history } from "../../../components/App/App";
import * as CBOR from "../../../../sagas/cbor";

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
    const decodedWebauthnChallenge = yield put(
      mfaDecodeMiddleware(encodedWebauthnChallenge)
    );
    yield put(putCsrfToken(decodedWebauthnChallenge));
    yield put(decodedWebauthnChallenge);
      history.push(`/reset-password/`);
    }
  } catch (error) {
    yield* failRequest(error, postLinkCodeFail(error));
  }
}

window.CBOR = CBOR;
const mfaDecodeMiddleware = (response) => {
  if(response.payload.extra_security.tokens && response.payload.extra_security.tokens.webauthn_options !== undefined) {
    const raw_options = response.payload.extra_security.tokens.webauthn_options;
    const options = atob(raw_options.replace(/_/g, "/").replace(/-/g, "+"));
    const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
    response.payload.extra_security.tokens.webauthn_options = CBOR.decode(byte_options.buffer);
  }
  return response;
};
