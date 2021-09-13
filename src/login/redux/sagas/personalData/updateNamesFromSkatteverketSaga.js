import { call, put, select } from "redux-saga/effects";
import postDataRequest from "../postDataRequest";
import * as actions from "../../actions/updateNamesFromSkatteverketActions";

export function* updateNamesFromSkatteverketSaga() {
  const state = yield select((state) => state);
  const url = "/services/security/" + "refresh-official-user-data";
  const dataToSend = {
    csrf_token: state.config.csrf_token,
  };

  try {
    const response = yield call(postDataRequest, url, dataToSend);
    console.log("response", response);
    yield put(response);
  } catch (error) {
    console.log(error);
    yield put(actions.updateNamesFromSkatteverketFail(error.toString()));
  }
}
