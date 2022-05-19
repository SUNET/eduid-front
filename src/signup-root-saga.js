import * as verifiedActions from "actions/CodeVerified";
import * as resendActions from "actions/ResendCode";
import * as signupMainActions from "actions/SignupMain";
import { all, takeLatest } from "redux-saga/effects";
import { resendCode } from "sagas/ResendCode";
import { requestCodeStatus, requestConfig } from "sagas/SignupMain";

function* rootSaga() {
  yield all([
    takeLatest(signupMainActions.GET_SIGNUP_CONFIG, requestConfig),
    takeLatest(verifiedActions.GET_CODE_STATUS, requestCodeStatus),
    takeLatest(resendActions.POST_SIGNUP_RESEND_VERIFICATION, resendCode),
  ]);
}

export default rootSaga;
