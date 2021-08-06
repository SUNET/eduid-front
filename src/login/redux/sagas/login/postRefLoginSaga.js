import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postRefLoginActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

export function* postRefLoginSaga() {
  const state = yield select((state) => state);
  const url = state.config.next_url;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
    if (response.type.endsWith("_SUCCESS")) {
      yield put(eduidRMAllNotify());
    }
  } catch (error) {
    yield put(actions.postRefFail(error.toString()));
  }
}
