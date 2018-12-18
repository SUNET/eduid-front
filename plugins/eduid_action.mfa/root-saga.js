
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { call, put, select } from "redux-saga/effects";

import defaultSaga from "plugins-saga";
import * as actions from "actions/ActionWrapper";
import { postRequest, checkStatus, putCsrfToken } from "sagas/common";

import { WEBAUTHN_CREDS_GOT } from "./component";


export function* postCompleteWebauthn () {
    try {
        const state = yield select(state => state),
              assertion = state.plugin.webauthn_assertion,
              data = {
                  credentialId: assertion.rawId,
                  authenticatorData: assertion.response.authenticatorData,
                  clientDataJSON: assertion.response.clientDataJSON,
                  signature: assertion.response.signature,
                  csrf_token: state.main.csrf_token,
              };
        const resp = yield call(requestCompleteWebauthn, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.postActionFail(error.toString()));
    }
}

export function requestCompleteWebauthn (data) {
    const url = 'post-action';
    return window.fetch(url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

function* rootSaga() {
    yield [
        ...defaultSaga,
        takeLatest(WEBAUTHN_CREDS_GOT, postCompleteWebauthn),
    ];
}

export default rootSaga;
