import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postWebauthnToAuthenticatorActions";
import { nextMockUrlFinished } from "../../actions/postRefLoginActions";

function safeEncode(obj) {
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  const unsafeObj = btoa(bytesObj);
  return unsafeObj.replace(/\//g, "_").replace(/\+/g, "-").replace(/=*$/, "");
}

export function* postWebauthnToAuthenticatorSaga() {
  const state = yield select((state) => state);
  const url = "https://idp.eduid.docker/mfa_auth";
  const assertion = state.login.mfa.webauthn_assertion;
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
      webauthn_response: {
        credentialId: safeEncode(assertion.rawId),
        authenticatorData: safeEncode(assertion.response.authenticatorData),
        clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        signature: safeEncode(assertion.response.signature),
      },
    };
    const authenticatorAssertionResponse = yield call(
      postRequest,
      url,
      dataToSend
    );
    yield put(putCsrfToken(authenticatorAssertionResponse));
     if (authenticatorAssertionResponse.payload.finished) {
      yield put(nextMockUrlFinished());
    }
  } catch (error) {
    yield put(actions.postWebauthnToAuthenticatorFail(error.toString()));
  }
}
