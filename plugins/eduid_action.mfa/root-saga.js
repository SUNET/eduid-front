
import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, select } from "redux-saga/effects";

import defaultSaga from "plugins-saga";
import * as actions from "actions/ActionWrapper";
import { postRequest, checkStatus, putCsrfToken } from "sagas/common";

import { U2FDATA_SIGNED } from "./component";


export function requestPostTokenResponse (data) {
    const url = 'post-action';
    return window.fetch(url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* postTokenResponse () {
    try {
        const state = yield select(state => state),
            data = {
                tokenResponse: state.plugin.token_response,
                csrf_token: state.main.csrf_token,
            };
        const resp = yield call(requestPostTokenResponse, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.postActionFail(error.toString()));
    }
}

function* rootSaga() {
    yield [
        ...defaultSaga,
        takeLatest(U2FDATA_SIGNED, postTokenResponse),
    ];
}

export default rootSaga;
