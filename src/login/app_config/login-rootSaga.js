import { takeLatest, takeEvery, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import {
  getResetPasswordConfig,
  postEmailLink,
} from "../redux/sagas/resetpassword/resetPasswordSaga";
import * as getResetPasswordActions from "../redux/actions/getResetPasswordActions";
import * as postResetPasswordActions from "../redux/actions/postResetPasswordActions";
import * as postRefToLoginActions from "../redux/actions/postRefToLoginActions";
import { postRefOnloadSaga } from "../redux/sagas/login/postRefOnloadSaga";

export const getLoginRef = (state) => state.login.ref;
function* loginSagas() {
  let ref = yield select(getLoginRef);
  console.log("ref", ref);
  if (ref) {
    yield [
      takeLatest(
        postRefToLoginActions.POST_LOGIN_REF_TO_NEXT,
        postRefOnloadSaga
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
  ];
}

export default rootSaga;
