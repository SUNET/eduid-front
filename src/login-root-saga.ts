import { requestPhoneCodeForNewPassword } from "login/redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
import { postSetNewPasswordExternalMfa } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityExternalMfaSaga";
import { postSetNewPasswordExtraSecurityPhone } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityPhoneSaga";
import { postSetNewPasswordExtraSecurityToken } from "login/redux/sagas/resetpassword/postSetNewPasswordExtraSecurityTokenSaga";
import loginSagas from "login/redux/sagas/rootSaga/loginSagas";
import resetPasswordSlice from "login/redux/slices/resetPasswordSlice";
import { all, takeLatest } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    ...loginSagas,
    takeLatest(resetPasswordSlice.actions.requestPhoneCode, requestPhoneCodeForNewPassword),
    // TODO: test (security phone request failed, trigger /verify-email to get users extra security) and remove
    // takeLatest("POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL", requestLinkCode),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityPhone, postSetNewPasswordExtraSecurityPhone),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityToken, postSetNewPasswordExtraSecurityToken),
    takeLatest(resetPasswordSlice.actions.setNewPasswordExtraSecurityExternalMfa, postSetNewPasswordExternalMfa),
  ]);
}

export default rootSaga;
