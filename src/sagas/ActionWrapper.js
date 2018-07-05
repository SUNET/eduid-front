
import { put, call, select } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "sagas/common";

import * as actions from "actions/ActionWrapper";
import { history } from "components/ActionWrapper";
import { eduidNotify } from "actions/Notifications";


export function* requestConfig () {
    const actions_url = ACTIONS_SERVICE_URL + 'config';
    try {
        console.log('Getting config from ' + actions_url);
        const config = yield call(fetchActions, actions_url);
        yield put(config);
        yield put(actions.appLoaded());
    } catch(error) {
        yield put(actions.getConfigFail(error.toString()));
    }
}


export function* requestNextAction () {
    const actions_url = ACTIONS_SERVICE_URL + 'get-actions';
    try {
        const nextAction = yield call(fetchActions, actions_url);
        if (nextAction.action === false) {
            document.location = nextAction.url;
        } else {
            document.location.reload();
        }
    } catch(error) {
        yield put(actions.getConfigFail(error.toString()));
    }
}

export function fetchActions (url) {
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
