import { takeLatest, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import {
  postEmailLink,
} from "../redux/sagas/resetpassword/resetPasswordSaga";
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
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD, postEmailLink)
  ];
}

export default rootSaga;
