import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";

// Saga that posts the versions of the ToU that is available in this bundle to the /tou endpoint.
export function* postTouVersionsSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    versions: action.payload.toString(), // TODO: backend should be changed to expect an array, and toString removed
    csrf_token: state.config.csrf_token,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(loginSlice.actions.postIdpTouSuccess(response.payload));
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail(error.toString()));
  }
}
