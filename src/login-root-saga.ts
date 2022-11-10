import { requestPhoneCodeForNewPassword } from "login/redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
import { postSetNewPasswordExternalMfa } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityExternalMfaSaga";
import { postSetNewPasswordExtraSecurityPhone } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityPhoneSaga";
import { postSetNewPasswordExtraSecurityToken } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityTokenSaga";
import { postSetNewPassword } from "login/redux/sagas/resetpassword/postSetNewPasswordSaga";
import { requestLinkCode } from "login/redux/sagas/resetpassword/postVerifyEmailSaga";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { all, takeLatest } from "redux-saga/effects";

function* rootSaga() {
  yield all([
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
