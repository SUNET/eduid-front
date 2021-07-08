import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postUsernamePasswordActions";
//import { useLoginRef } from "../../actions/postRefLoginActions";
import { nextMockUrlTou } from "../../actions/postRefLoginActions";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";

export function* postUsernamePasswordSaga(action) {
  const state = yield select((state) => state);
  const url = "https://idp.eduid.docker/pw_auth";
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    username: action.payload.username,
    password: action.payload.password,
  };
  try {
    yield put(loadingData());
    const postUsernamePasswordResponse = yield call(
      postRequest,
      url,
      dataToSend
    );
    yield put(putCsrfToken(postUsernamePasswordResponse));
    yield put(loadingDataComplete());
    if (postUsernamePasswordResponse.payload.finished) {
      // MOCK: forced navigation to tou
      yield put(nextMockUrlTou());
      //yield put(useLoginRef());
    }
  } catch (error) {
    yield put(actions.postUsernamePasswordFail(error.toString()));
    yield put(loadingDataComplete());
  }
}
