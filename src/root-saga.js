
import { takeLatest, takeEvery } from 'redux-saga';
import { put, select } from "redux-saga/effects";

import * as mainActions from "actions/Main";
import * as captchaActions from "actions/Captcha";
import * as resendActions from "actions/ResendCode";

import { requestConfig } from "sagas/Main";
import { requestCodeStatus } from "sagas/Main";
import { sendCaptcha } from "sagas/Captcha";
import { resendCode } from "sagas/ResendCode";


function* rootSaga() {
  yield [
    takeLatest(mainActions.GET_SIGNUP_CONFIG, requestConfig),
    takeLatest(captchaActions.POST_SIGNUP_TRYCAPTCHA, sendCaptcha),
    takeLatest(mainActions.GET_CODE_STATUS, requestCodeStatus),
    takeLatest(resendActions.POST_SIGNUP_RESEND_VERIFICATION, resendCode),
  ];
}

export default rootSaga;
