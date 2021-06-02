import { call, select, put } from "redux-saga/effects";
// import postRequest from "../postDataRequest";
import { checkStatus, postRequest } from "../../../../sagas/common";
import { putCsrfToken } from "../../../../sagas/common";

export function* postRefOnloadSaga(action) {
  console.log("welcome to nextLoginStepSaga");
  console.log(postNextRequest);
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
    const nextLoginStepResponse = yield call(postNextRequest, url, dataToSend);
    console.log("nextLoginStepResponse", nextLoginStepResponse);
    // yield put(putCsrfToken(nextLoginStepResponse));
    // yield put(nextLoginStepResponse);
  } catch (error) {
    // yield put(actions.createInviteFail(error.toString()));
  }
}

export function postNextRequest(url, data) {
  console.log("postRequest url", url);
  console.log("postRequest data", data);
  const request = {
    ...postRequest,
    redirect: "follow",
    body: JSON.stringify(data),
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}
