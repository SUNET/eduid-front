import { takeLatest } from "redux-saga/effects";
import { all } from "redux-saga/effects";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import loginSagas from "login/redux/sagas/rootSaga/loginSagas";
import { requestPhoneCodeForNewPassword } from "login/redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
import { requestLinkCode } from "login/redux/sagas/resetpassword/postVerifyEmailSaga";
import { postSetNewPassword } from "login/redux/sagas/resetpassword/postSetNewPasswordSaga";
import { postSetNewPasswordExtraSecurityPhone } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityPhoneSaga";
import { postSetNewPasswordExtraSecurityToken } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityTokenSaga";
import { postSetNewPasswordExternalMfa } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityExternalMfaSaga";

function* rootSaga() {
  yield all([
    ...loginSagas,
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
