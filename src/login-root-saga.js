import { takeLatest, takeEvery } from "redux-saga/effects";

import * as actions from "login/LoginMain/LoginMain_actions";
import { requestLoginConfig } from "login/LoginMain/LoginMain_sagas";

import * as init_actions from "login/InitialResetForm/InitialResetForm_actions";
import { initReset } from "login/InitialResetForm/InitialResetForm_sagas";

import * as code_actions from "login/ResetpwCode/ResetpwCode_actions";
import { getConfigFromCode } from "login/ResetpwCode/ResetpwCode_sagas";


function* rootSaga() {
  yield [
    takeLatest(actions.GET_LOGIN_CONFIG, requestLoginConfig),
    takeLatest(init_actions.DEAL_WITH_EMAIL, initReset),
    takeLatest(code_actions.CODE_FOR_CONFIG, getConfigFromCode),
  ];
}

export default rootSaga;
