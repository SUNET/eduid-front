import { takeLatest } from "redux-saga/effects";

import * as signupMainActions from "actions/SignupMain";
import * as verifiedActions from "actions/CodeVerified";
import * as captchaActions from "actions/Captcha";
import * as resendActions from "actions/ResendCode";

import { requestConfig } from "sagas/SignupMain";
import { requestCodeStatus } from "sagas/SignupMain";
import { sendCaptcha } from "sagas/Captcha";
import { resendCode } from "sagas/ResendCode";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    takeLatest(signupMainActions.GET_SIGNUP_CONFIG, requestConfig),
    //takeLatest(captchaActions.POST_SIGNUP_TRYCAPTCHA, sendCaptcha),
    takeLatest(verifiedActions.GET_CODE_STATUS, requestCodeStatus),
    takeLatest(resendActions.POST_SIGNUP_RESEND_VERIFICATION, resendCode),
  ]);
}

export default rootSaga;
