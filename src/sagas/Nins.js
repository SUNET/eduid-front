
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, getRequest, failRequest } from "actions/common";
import * as actions from "actions/Nins";


export function* requestNins () {
    try {
        yield put(actions.getNins());
        const config = yield select(state => state.config);
        const nins = yield call(fetchNins, config);
        yield put(putCsrfToken(nins));
        yield put(nins);
    } catch(error) {
        yield* failRequest(error, actions.getNinsFail);
    }
}


export function fetchNins(config) {
    return window.fetch(config.PERSONAL_DATA_URL + 'nins', {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* requestRemoveNin () {
    try {
        const state = yield select(state => state),
              data = {
                nin: state.nins.rmNin,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield* failRequest(error, actions.startRemoveFail);
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.SECURITY_URL + 'remove-nin', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
