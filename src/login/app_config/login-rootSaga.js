import { takeLatest } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { requestPhoneCodeForNewPassword } from "../redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
import { postEmailLink } from "../redux/sagas/resetpassword/postResetPasswordSaga";
import { postSetNewPasswordExternalMfa } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityExternalMfaSaga";
import { postSetNewPasswordExtraSecurityPhone } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityPhoneSaga";
import { postSetNewPasswordExtraSecurityToken } from "../redux/sagas/resetpassword/postSetNewPasswordExtraSecurityTokenSaga";
import { postSetNewPassword } from "../redux/sagas/resetpassword/postSetNewPasswordSaga";
import { requestLinkCode } from "../redux/sagas/resetpassword/postVerifyEmailSaga";
import loginSagas from "../redux/sagas/rootSaga/loginSagas";
import resetPasswordSlice from "../redux/slices/resetPasswordSlice";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    takeLatest(init_actions.GET_CONFIG, requestConfig),
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, requestLinkCode),
    ...loginSagas,
    takeLatest(resetPasswordSlice.actions.requestEmailLink, postEmailLink),
    takeLatest(resetPasswordSlice.actions.requestPhoneCode, requestPhoneCodeForNewPassword),
    // security phone request failed, trigger /verify-email to get users extra security
    takeLatest("POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL", requestLinkCode),
    takeLatest(resetPasswordSlice.actions.setNewPassword, postSetNewPassword),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityPhone, postSetNewPasswordExtraSecurityPhone),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityToken, postSetNewPasswordExtraSecurityToken),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityExternalMfa, postSetNewPasswordExternalMfa),
    takeLatest(resetPasswordSlice.actions.useLinkCode, requestLinkCode),
  ]);
}

export default rootSaga;
