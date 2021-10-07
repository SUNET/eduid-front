import { takeLatest, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { postEmailLink } from "../redux/sagas/resetpassword/postResetPasswordSaga";
import { useLinkCode } from "../redux/sagas/resetpassword/postVerifyEmailSaga";
import * as resetPasswordActions from "../redux/actions/resetPasswordActions";
import loginSagas from "../redux/sagas/rootSaga/loginSagas";
import { requestPhoneCode } from "../redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
import { postSetNewPassword } from "../redux/sagas/resetpassword/postSetNewPasswordSaga";
import { postSetNewPasswordExtraSecurityPhone } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityPhoneSaga";
import { postSetNewPasswordExtraSecurityToken } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityTokenSaga";
import { postSetNewPasswordExternalMfa } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityExternalMfaSaga";

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
    takeLatest(resetPasswordActions.requestEmailLink.toString(), postEmailLink),
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, useLinkCode),
    takeLatest(resetPasswordActions.requestPhoneCode.toString(), requestPhoneCode),
    // security phone request failed, trigger /verify-email to get users extra security
    takeLatest("POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL", useLinkCode),
    takeLatest(resetPasswordActions.setNewPassword.toString(), postSetNewPassword),
    takeLatest(resetPasswordActions.setNewPasswordExtraSecurityPhone.toString(), postSetNewPasswordExtraSecurityPhone),
    takeLatest(resetPasswordActions.setNewPasswordExtraSecurityToken.toString(), postSetNewPasswordExtraSecurityToken),
    takeLatest(resetPasswordActions.setNewPasswordExtraSecurityExternalMfa.toString(), postSetNewPasswordExternalMfa),
    takeLatest(resetPasswordActions.requestPhoneCode.toString(), useLinkCode),
  ];
}

export default rootSaga;