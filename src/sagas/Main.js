
import { put, call } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "sagas/common";

import * as actions from "actions/Main";


export function* requestCodeStatus () {
    const url = SIGNUP_SERVICE_URL + 'code/';
    try {
        const config = yield call(fetchCodeStatus, url);
        yield put(config);
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
    return window.fetch(url, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}
