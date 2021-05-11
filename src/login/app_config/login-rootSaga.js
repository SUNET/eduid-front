import { takeLatest } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { getResetPasswordConfig, postEmailLink } from "../redux/sagas/resetpassword/resetPasswordSaga";
import * as resetPasswordActions from "../redux/actions/resetPasswordActions";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(resetPasswordActions.GET_RESET_PASSWORD, getResetPasswordConfig),
    takeLatest(resetPasswordActions.POST_RESET_PASSWORD, postEmailLink),
  ];
}

export default rootSaga;