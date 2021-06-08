import { takeLatest, takeEvery, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import {
  getResetPasswordConfig,
  postEmailLink,
  useLinkCode
} from "../redux/sagas/resetpassword/resetPasswordSaga";
import * as getResetPasswordActions from "../redux/actions/getResetPasswordActions";
import * as postResetPasswordActions from "../redux/actions/postResetPasswordActions";
import * as postRefLoginActions from "../redux/actions/postRefLoginActions";
import { postRefLoginSaga } from "../redux/sagas/login/postRefLoginSaga";

export const getLoginRef = (state) => state.login.ref;
function* loginSagas() {
  let ref = yield select(getLoginRef);
  if (ref) {
    yield [
      takeLatest(
        postRefLoginActions.POST_LOGIN_REF_TO_NEXT,
        postRefLoginSaga
      ),
    ];
  }
}

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, loginSagas),
    takeLatest(
      getResetPasswordActions.GET_RESET_PASSWORD,
      getResetPasswordConfig
    ),
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD, postEmailLink),
    takeEvery(
      postResetPasswordActions.POST_RESET_PASSWORD_FAIL,
      getResetPasswordConfig
    ),
    takeLatest(postResetPasswordActions.SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE, getResetPasswordConfig),
    takeLatest(getResetPasswordActions.GET_RESET_PASSWORD_SUCCESS, useLinkCode),
  ];
}

export default rootSaga;
