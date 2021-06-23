import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postRefWebauthnOptionsActions";
// import { nextMockUrlMfa } from "../../actions/postRefLoginActions";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

export function* postRefWebauthnOptionsSaga(action) {
  const state = yield select((state) => state);
  const url = "https://idp.eduid.docker/mfa_auth";
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
    };
    // yield put(eduidRMAllNotify());
    // yield put(loadingData());
    const webauthnOptionsResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(webauthnOptionsResponse));
    yield put(webauthnOptionsResponse);
    yield put(loadingDataComplete());
    // if (postUpdatedTouAcceptResponse.payload.finished) {
    //   yield put(nextMockUrlMfa());
    // }
  } catch (error) {
    console.log(error);
    yield put(actions.postRefToWebauthnOptionsFail(error.toString()));
    yield put(loadingDataComplete());
  }
}

