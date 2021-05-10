import { takeLatest } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig, getResetPasswordData, postEmail } from "../app_init/init_sagas";
import * as resetPasswordActions from "../redux/actions/resetPasswordActions";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(resetPasswordActions.GET_RESET_PASSWORD, getResetPasswordData),
    takeLatest(resetPasswordActions.POST_RESET_PASSWORD, postEmail),
  ];
}

export default rootSaga;