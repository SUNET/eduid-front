
import { takeLatest, takeEvery } from 'redux-saga';
import { put, select } from "redux-saga/effects";

import * as mainActions from "actions/Main";

import { requestConfig } from "sagas/Main";


function* rootSaga() {
  yield [
    takeLatest(mainActions.GET_SIGNUP_CONFIG, requestConfig),
  ];
}

export default rootSaga;
