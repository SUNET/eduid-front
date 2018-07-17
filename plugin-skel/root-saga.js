
import { takeLatest, takeEvery } from 'redux-saga';
import { call, put, select } from "redux-saga/effects";

import defaultSaga from "plugins-saga";
import * as actions from "actions/ActionWrapper";
import { postRequest, checkStatus, putCsrfToken } from "sagas/common";


// define sagas

function* rootSaga() {
    yield [
        ...defaultSaga,
        // any additional sagas defined above
    ];
}

export default rootSaga;

