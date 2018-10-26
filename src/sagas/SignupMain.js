
import { put, call, select } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "sagas/common";

import * as actions from "actions/SignupMain";
import { history } from "components/SignupMain";
import { eduidNotify } from "actions/Notifications";


export function* requestCodeStatus () {
    try {
        const state = yield select(state => state),
              url = SIGNUP_SERVICE_URL + 'verify-link/' + state.config.code;
        const codeStatus = yield call(fetchCodeStatus, url);
        yield* requestConfig();
        if (codeStatus.payload.status === 'unknown-code') {
            history.push(BASE_PATH + "/email");
            yield put(eduidNotify('code.unknown-code', 'messages'));
        } else if (codeStatus.payload.status === 'already-verified') {
            history.push(BASE_PATH + "/resend-code");
            yield put(eduidNotify('code.already-verified', 'messages'));
        } else if (codeStatus.payload.status === 'verified') {
            yield put(codeStatus);
            history.push(BASE_PATH + "/code-verified");
        }
    } catch(error) {
        yield put(actions.getCodeStatusFail(error.toString()));
    }
}

export function fetchCodeStatus (url) {
    return window.fetch(url, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* requestConfig () {
    const signup_url = SIGNUP_SERVICE_URL + 'config';
    try {
        console.log('Getting config from ' + signup_url);
        const config = yield call(fetchConfig, signup_url);
        yield put(config);
        yield put(actions.appLoaded());
    } catch(error) {
        yield put(actions.getConfigFail(error.toString()));
    }
}

export function fetchConfig (url) {
    const request = {
        ...getRequest,
        redirect: 'follow'
    };
    return window.fetch(url, {
        ...request
    })
    .then(checkStatus)
    .then(response => response.json())
}
