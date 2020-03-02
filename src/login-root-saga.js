import { takeLatest } from "redux-saga/effects";

import * as actions from "login/LoginMain/LoginMain_actions";
import { requestLoginConfig } from "login/LoginMain/LoginMain_sagas";
import { getConfigFromCode } from "login/LoginMain/LoginMain_sagas";

import * as init_actions from "login/InitResetForm/InitResetForm_actions";
import { initReset } from "login/InitResetForm/InitResetForm_sagas";

import * as resetting_actions from "login/Resetting/Resetting_actions";
import { postExtrasecWithSMSCode } from "login/Resetting/Resetting_sagas";

import * as reset_actions from "login/DoReset/DoReset_actions";
import { postPasswordReset,
         postPasswordResetWithSMSCode,
         postPasswordResetWithToken,
         askForToken } from "login/DoReset/DoReset_sagas";


function* rootSaga() {
  yield [
    takeLatest(actions.GET_LOGIN_CONFIG, requestLoginConfig),
    takeLatest(init_actions.DEAL_WITH_EMAIL, initReset),
    takeLatest(actions.CODE_FOR_CONFIG, getConfigFromCode),
    takeLatest(resetting_actions.CHOOSE_EXTRA_SECURITY_PHONE, postExtrasecWithSMSCode),
    takeLatest(reset_actions.DO_RESET_PASSWORD, postPasswordReset),
    takeLatest(reset_actions.DO_RESET_PASSWORD_SMS, postPasswordResetWithSMSCode),
    takeLatest(reset_actions.WEBAUTHN_CREDS_GOT, postPasswordResetWithToken),
    takeLatest(reset_actions.ASK_FOR_TOKEN_AND_RESET, askForToken),
  ];
}

export default rootSaga;
