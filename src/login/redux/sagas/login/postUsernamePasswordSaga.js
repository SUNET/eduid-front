import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postUsernamePasswordActions";

export function* postUsernamePasswordSaga(action) {
  const state = yield select((state) => state);
  const url = "https://idp.eduid.docker/pw_auth";
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
      username: action.payload.username,
      password: action.payload.password,
    };
    const postUsernamePasswordResponse = yield call(
      postRequest,
      url,
      dataToSend
    );
    yield put(putCsrfToken(postUsernamePasswordResponse));
    yield put(postUsernamePasswordResponse);
  } catch (error) {
    yield put(actions.postUsernamePasswordFail(error.toString()));
  }
}
