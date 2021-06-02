import { takeLatest, takeEvery } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { getResetPasswordConfig, postEmailLink, useLinkCode } from "../redux/sagas/resetpassword/resetPasswordSaga";
import * as getResetPasswordActions from "../redux/actions/getResetPasswordActions";
import * as postResetPasswordActions from "../redux/actions/postResetPasswordActions";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(getResetPasswordActions.GET_RESET_PASSWORD, getResetPasswordConfig),
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD, postEmailLink),
    takeEvery(postResetPasswordActions.POST_RESET_PASSWORD_FAIL, getResetPasswordConfig),
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD_VERIFY_EMAIL, useLinkCode)
  ];
}

export default rootSaga;