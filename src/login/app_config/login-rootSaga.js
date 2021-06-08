import { takeLatest, takeEvery, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import {
  getResetPasswordConfig,
  postEmailLink,
} from "../redux/sagas/resetpassword/resetPasswordSaga";
import * as getResetPasswordActions from "../redux/actions/getResetPasswordActions";
import * as postResetPasswordActions from "../redux/actions/postResetPasswordActions";
import loginSagas from "../redux/sagas/rootSaga/loginSagas";

export const getLoginRef = (state) => state.login.ref;
function* allowLoginSagas() {
  let ref = yield select(getLoginRef);
  if (ref) {
    yield [...loginSagas];
  }
}

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, allowLoginSagas),
    takeLatest(
      getResetPasswordActions.GET_RESET_PASSWORD,
      getResetPasswordConfig
    ),
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD, postEmailLink),
    takeEvery(
      postResetPasswordActions.POST_RESET_PASSWORD_FAIL,
      getResetPasswordConfig
    ),
  ];
}

export default rootSaga;
