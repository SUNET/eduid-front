import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postRefLoginActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";

export function* postRefLoginSaga() {
  const state = yield select((state) => state);
  const url = state.config.next_url;
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
    };
    yield put(loadingData());
    const nextLoginStepResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(nextLoginStepResponse));
    yield put(nextLoginStepResponse);
    yield put(loadingDataComplete());
    yield put(eduidRMAllNotify());
  } catch (error) {
    yield put(actions.postRefFail(error.toString()));
    yield put(loadingDataComplete());
  }
}
