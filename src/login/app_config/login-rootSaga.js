import { takeLatest } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig, getResetPasswordData } from "../app_init/init_sagas";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(init_actions.GET_CONFIG, getResetPasswordData),
  ];
}

export default rootSaga;
