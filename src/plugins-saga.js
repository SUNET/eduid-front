
import { takeLatest, takeEvery } from 'redux-saga/effects';
import { call, put, select } from "redux-saga/effects";

import * as actions from "actions/ActionWrapper";
import { requestConfig, requestNextAction } from "sagas/ActionWrapper";


const defaultSaga = [
    takeLatest(actions.GET_ACTIONS_CONFIG, requestConfig),
    takeLatest(actions.POST_ACTIONS_ACTION_SUCCESS, requestNextAction),
];

export default defaultSaga;
