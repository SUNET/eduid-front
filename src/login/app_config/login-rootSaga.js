import { takeLatest } from "redux-saga/effects";

import * as init_actions from "../app_init/init_actions";
import { requestLoginConfig } from "../app_init/init_sagas";

// import * as login_actions from "../components/LoginApp/LoginForm/LoginForm_actions";
// import { postLoginDetails } from "../components/LoginApp/LoginForm/LoginForm_sagas";
import * as getEmailLink_actions from "../components/LoginApp/ResetPassword/GetEmailLink/GetEmailLink_actions";
import { postEmail } from "../components/LoginApp/ResetPassword/GetEmailLink/GetEmailLink_sagas";

import * as emailLinkSent_actions from "../components/LoginApp/ResetPassword/EmailLinkSent/EmailLinkSent_actions";
import { postEmailLinkCode } from "../components/LoginApp/ResetPassword/EmailLinkSent/EmailLinkSent_sagas";

// import * as resetting_actions from "login/components/Resetting/Resetting_actions";
// import { getConfigFromCode } from "login/components/Resetting/Resetting_sagas";

function* rootSaga() {
  yield [
    takeLatest(init_actions.GET_LOGIN_CONFIG, requestLoginConfig),
    takeLatest(getEmailLink_actions.ADD_EMAIL, postEmail),
    takeLatest(emailLinkSent_actions.POST_EMAIL_LINK_CODE, postEmailLinkCode)
    // takeLatest(resetting_actions.CODE_FOR_CONFIG, getConfigFromCode),
    // takeLatest(actions.GET_LOGIN_CONFIG, requestLoginConfig),
    // takeLatest(init_actions.DEAL_WITH_EMAIL, initReset),
    // takeLatest(actions.CODE_FOR_CONFIG, getConfigFromCode),
    // takeLatest(resetting_actions.CHOOSE_EXTRA_SECURITY_PHONE, postExtrasecWithSMSCode),
    // takeLatest(reset_actions.DO_RESET_PASSWORD, postPasswordReset),
    // takeLatest(reset_actions.DO_RESET_PASSWORD_SMS, postPasswordResetWithSMSCode),
    // takeLatest(reset_actions.WEBAUTHN_CREDS_GOT, postPasswordResetWithToken),
    // takeLatest(reset_actions.ASK_FOR_TOKEN_AND_RESET, askForToken),
  ];
}

export default rootSaga;
