
import { put, call, select } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, postRequest,
         putCsrfToken } from "sagas/common";

import * as actions from "actions/Captcha";


export function* sendCaptcha () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.main.email,
                recaptcha_response: state.captcha.captcha_verification,
                csrf_token: state.main.csrf_token
              };
        const resp = yield call(requestSendCaptcha, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.postCaptchaFail(error.toString()));
    }
}

export function requestSendCaptcha (data) {
    const signup_url = SIGNUP_SERVICE_URL + 'trycaptcha';
    return window.fetch(signup_url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
