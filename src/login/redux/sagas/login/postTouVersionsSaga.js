import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import { loginSagaFail } from "../../actions/loginActions";

// Saga that posts the versions of the ToU that is available in this bundle to the /tou endpoint.
export function* postTouVersionsSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    versions: action.payload.toString(),
    csrf_token: state.config.csrf_token,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield put(loginSagaFail(error.toString()));
  }
}
