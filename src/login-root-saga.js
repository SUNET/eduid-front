import { takeLatest } from "redux-saga/effects";

import * as actions from "login/LoginMain/LoginMain_actions";
import { requestLoginConfig } from "login/LoginMain/LoginMain_sagas";

import * as init_actions from "login/InitResetForm/InitResetForm_actions";
import { initReset } from "login/InitResetForm/InitResetForm_sagas";

import * as resetting_actions from "login/Resetting/Resetting_actions";
import { getConfigFromCode } from "login/Resetting/Resetting_sagas";

function* rootSaga() {
  yield [
    takeLatest(actions.GET_LOGIN_CONFIG, requestLoginConfig),
    takeLatest(init_actions.DEAL_WITH_EMAIL, initReset),
    takeLatest(resetting_actions.CODE_FOR_CONFIG, getConfigFromCode),
  ];
}

export default rootSaga;
