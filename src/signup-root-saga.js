import { takeLatest, takeEvery } from "redux-saga/effects";
import { put, select } from "redux-saga/effects";

import * as signupMainActions from "actions/SignupMain";
import * as captchaActions from "actions/Captcha";
import * as resendActions from "actions/ResendCode";

import { requestConfig } from "sagas/SignupMain";
import { requestCodeStatus } from "sagas/SignupMain";
import { sendCaptcha } from "sagas/Captcha";
import { resendCode } from "sagas/ResendCode";

function* rootSaga() {
  yield [
    takeLatest(signupMainActions.GET_SIGNUP_CONFIG, requestConfig),
    takeLatest(captchaActions.POST_SIGNUP_TRYCAPTCHA, sendCaptcha),
    takeLatest(signupMainActions.GET_CODE_STATUS, requestCodeStatus),
    takeLatest(resendActions.POST_SIGNUP_RESEND_VERIFICATION, resendCode)
  ];
}

export default rootSaga;
