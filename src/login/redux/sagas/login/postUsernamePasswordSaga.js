import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postUsernamePasswordActions";
import { useLoginRef } from "../../actions/postRefLoginActions";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";

export function* postUsernamePasswordSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    username: action.payload.username,
    password: action.payload.password,
  };
  try {
    yield put(loadingData());
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
    if (response.payload.finished) {
      yield put(useLoginRef());
    }
  } catch (error) {
    yield put(actions.postUsernamePasswordFail(error.toString()));
  } finally {
    yield put(loadingDataComplete());
  }
}
