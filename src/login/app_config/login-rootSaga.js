import { takeLatest, select } from "redux-saga/effects";
import * as init_actions from "../app_init/init_actions";
import { requestConfig } from "../app_init/init_sagas";
import { postEmailLink } from "../redux/sagas/resetpassword/postResetPasswordSaga";
import { requestLinkCode } from "../redux/sagas/resetpassword/postVerifyEmailSaga";
import {
  requestEmailLink,
  requestPhoneCode,
  setNewPassword,
  setNewPasswordExtraSecurityPhone,
  setNewPasswordExtraSecurityToken,
  setNewPasswordExtraSecurityExternalMfa,
  useLinkCode,
} from "../redux/slices/resetPasswordSlice";
import loginSagas from "../redux/sagas/rootSaga/loginSagas";
import { requestPhoneCodeForNewPassword } from "../redux/sagas/resetpassword/postExtraSecurityPhoneSaga";
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
    takeLatest(init_actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS, requestLinkCode),
    takeLatest(requestEmailLink.type, postEmailLink),
    takeLatest(requestPhoneCode.type, requestPhoneCodeForNewPassword),
    // security phone request failed, trigger /verify-email to get users extra security
    takeLatest(
      "POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE_FAIL",
      requestLinkCode
    ),
    takeLatest(setNewPassword.type, postSetNewPassword),
    takeLatest(
      setNewPasswordExtraSecurityPhone.type,
      postSetNewPasswordExtraSecurityPhone
    ),
    takeLatest(
      setNewPasswordExtraSecurityToken.type,
      postSetNewPasswordExtraSecurityToken
    ),
    takeLatest(
      setNewPasswordExtraSecurityExternalMfa.type,
      postSetNewPasswordExternalMfa
    ),
    takeLatest(useLinkCode.type, requestLinkCode),
  ];
}

export default rootSaga;
