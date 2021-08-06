import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postUpdatedTouAcceptActions";
import { useLoginRef } from "../../actions/postRefLoginActions";

export function* postUpdatedTouAcceptSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    user_accepts: action.payload.user_accepts,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
    if (response.payload.finished) {
      yield put(useLoginRef());
    }
  } catch (error) {
    yield put(actions.updateTouAcceptFail(error.toString()));
  }
}
