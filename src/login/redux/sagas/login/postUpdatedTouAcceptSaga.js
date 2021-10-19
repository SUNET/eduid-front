import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";

// Saga to post the version of the ToU the user has just accepted to the /tou endpoint.
export function* postUpdatedTouAcceptSaga(action) {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    user_accepts: action.payload,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
    if (response.payload.finished) {
      yield put(loginSlice.actions.useLoginRef());
    }
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail(error.toString()));
  }
}
