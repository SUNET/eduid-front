import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postTouVersionsActions";

export function* postTouVersionsSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  try {
    const dataToSend = {
      ref: state.login.ref,
      versions: action.payload.versions.toString(),
      csrf_token: state.config.csrf_token,
    };
    const touVersionResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(touVersionResponse));
    yield put(touVersionResponse);
  } catch (error) {
    yield put(actions.postTouVersionsFail(error.toString()));
  }
}
