
import { put, call, select } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest, putCsrfToken } from "sagas/common";

import * as actions from "actions/ActionWrapper";
import { history } from "components/ActionWrapper";
import { eduidNotify } from "actions/Notifications";
import * as CBOR from "sagas/cbor";
import { newCsrfToken } from "actions/Main";

window.CBOR = CBOR;


export function* requestConfig () {
    const actions_url = ACTIONS_SERVICE_URL + 'config';
    try {
        console.log('Getting config from ' + actions_url);
        const action = yield call(fetchConfig, actions_url);
        yield put(putCsrfToken(action));
        yield put(action);
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
    .then(response => {
        if (response.payload && response.payload.webauthn_options !== undefined) {
            const raw_options = response.payload.webauthn_options;
            const options = atob(raw_options.replace(/_/g, '/').replace(/-/g, '+'));
            const byte_options = Uint8Array.from(options, c => c.charCodeAt(0));
            response.payload.webauthn_options = CBOR.decode(byte_options.buffer);
        }
        console.log('Action config: ', response);    
        return response;
    })
}

export function* requestNextAction () {
    const actions_url = ACTIONS_SERVICE_URL + 'get-actions';
    try {
        const nextAction = yield call(fetchActions, actions_url);
        yield put(putCsrfToken(nextAction));
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
