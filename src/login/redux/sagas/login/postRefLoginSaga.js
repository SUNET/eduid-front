import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";

export function* postRefLoginSaga(action) {
  console.log("welcome to nextLoginStepSaga");
  // console.log(postNextRequest);
  const state = yield select((state) => state);
  const url = state.config.next_url;
  console.log("url ", url);
  // const url = IDP_SERVICE_URL + "/next";
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
    };
    console.log("dataToSend", dataToSend);
    const nextLoginStepResponse = yield call(postRequest, url, dataToSend);
    console.log("nextLoginStepResponse", nextLoginStepResponse);
    // yield put(putCsrfToken(nextLoginStepResponse));
    // yield put(nextLoginStepResponse);
  } catch (error) {
    // yield put(actions.createInviteFail(error.toString()));
  }
}

