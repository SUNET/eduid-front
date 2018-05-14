
import { takeLatest, takeEvery } from 'redux-saga';
import { put, select } from "redux-saga/effects";

import * as mainActions from "actions/Main";
import * as captchaActions from "actions/Captcha";

import { requestConfig } from "sagas/Main";
import { requestCodeStatus } from "sagas/Main";
import { sendCaptcha } from "sagas/Captcha";


function* rootSaga() {
  yield [
    takeLatest(mainActions.GET_SIGNUP_CONFIG, requestConfig),
    takeLatest(captchaActions.POST_SIGNUP_TRYCAPTCHA, sendCaptcha),
    takeLatest(mainActions.GET_CODE_STATUS, requestCodeStatus),
  ];
}

export default rootSaga;
