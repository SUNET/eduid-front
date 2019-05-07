import { takeLatest, takeEvery } from "redux-saga/effects";
import { call, put, select } from "redux-saga/effects";

import defaultSaga from "plugins-saga";
import * as actions from "actions/ActionWrapper";
import { postRequest, checkStatus, putCsrfToken } from "sagas/common";

import { WEBAUTHN_CREDS_GOT } from "./component";

function safeEncode(obj) {
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  const unsafeObj = btoa(bytesObj);
  return unsafeObj
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=*$/, "");
}

export function* postCompleteWebauthn() {
  try {
    const state = yield select(state => state),
      assertion = state.plugin.webauthn_assertion,
      data = {
        credentialId: safeEncode(assertion.rawId),
        authenticatorData: safeEncode(assertion.response.authenticatorData),
        clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        signature: safeEncode(assertion.response.signature),
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestCompleteWebauthn, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    console.log("Problem completing webauthn", error);
    yield put(actions.postActionFail(error.toString()));
  }
}

export function requestCompleteWebauthn(data) {
  const url = "post-action";
  return window
    .fetch(url, {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function handleRetry() {
  document.location.reload();
}

function* rootSaga() {
  yield [
    ...defaultSaga,
    takeLatest(WEBAUTHN_CREDS_GOT, postCompleteWebauthn),
    takeLatest(actions.RETRY, handleRetry)
  ];
}

export default rootSaga;
