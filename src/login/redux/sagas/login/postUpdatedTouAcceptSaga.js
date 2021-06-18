import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postUpdatedTouAcceptActions";
import { nextMockUrlMfa } from "../../actions/postRefLoginActions";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";

export function* postUpdatedTouAcceptSaga(action) {
  const state = yield select((state) => state);
  const url = "https://idp.eduid.docker/tou";
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
      user_accepts: action.payload.user_accepts,
    };
    console.log("dataToSend", dataToSend);
    yield put(eduidRMAllNotify());
    yield put(loadingData());
    const postUpdatedTouAcceptResponse = yield call(
      postRequest,
      url,
      dataToSend
    );
    yield put(putCsrfToken(postUpdatedTouAcceptResponse));
    yield put(postUpdatedTouAcceptResponse);
    yield put(loadingDataComplete());
    if (postUpdatedTouAcceptResponse.payload.finished) {
      yield put(nextMockUrlMfa());
    }
  } catch (error) {
    console.log(error);
    yield put(actions.updateTouAcceptFail(error.toString()));
    yield put(loadingDataComplete());
  }
}
