import { signupSlice } from "reducers/Signup";
import { all, takeLatest, put } from "redux-saga/effects";
import { fetchVerifyLink } from "apis/eduidSignup";

function* rootSaga() {
  yield all([takeLatest(signupSlice.actions.useVerifyLinkCode, requestLinkCode)]);
}

export function* requestLinkCode() {
  yield put(fetchVerifyLink());
}

export default rootSaga;
