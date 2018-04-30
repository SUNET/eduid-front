
import { put, call } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "sagas/common";

import * as actions from "actions/Main";


export function* requestCodeStatus () {
    const url = SIGNUP_SERVICE_URL;
    try {
        const config = yield call(fetchConfig, url);
        yield put(config);
    } catch(error) {
        yield put(actions.getCodeStatusFail(error.toString()));
    }
}

export function fetchConfig (url) {
    return window.fetch(url, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}
