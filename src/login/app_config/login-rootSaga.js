import { takeLatest, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { postEmailLink } from "../redux/sagas/resetpassword/postResetPasswordSaga";
import { useLinkCode } from "../redux/sagas/resetpassword/postVerifyEmailSaga";
import * as postResetPasswordActions from "../redux/actions/postResetPasswordActions";
import loginSagas from "../redux/sagas/rootSaga/loginSagas";
import { requestPhoneCode } from "../redux/sagas/resetpassword//postExtraSecurityPhoneSaga";

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
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD, postEmailLink),
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, useLinkCode),
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE, requestPhoneCode),
    // security phone request failed, trigger /verify-email to get users extra security
    takeLatest(postResetPasswordActions.POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL, useLinkCode),
  ];
}

export default rootSaga;