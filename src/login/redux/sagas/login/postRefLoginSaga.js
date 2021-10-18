import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/loginActions";
import loginSlice from "../../slices/loginSlice";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

// Call the /next endpoint to see what the backend requires us to do to proceed with this login.
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
      yield put(loginSlice.actions.postIdpNextSuccess(response.payload));
      yield put(eduidRMAllNotify());
    }
  } catch (error) {
    yield put(actions.loginSagaFail(error.toString()));
  }
}
