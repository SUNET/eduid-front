import { call, put, select } from "redux-saga/effects";
import postDataRequest from "../postDataRequest";
import * as actions from "../../actions/updateNamesFromSkatteverketActions";
import { putCsrfToken } from "../../../../sagas/common";
import { getInitialUserdata } from "../../../../actions/DashboardConfig";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";

export function* updateNamesFromSkatteverketSaga() {
  const state = yield select((state) => state);
  const url = "/services/security/refresh-official-user-data";
  const dataToSend = {
    csrf_token: state.config.csrf_token,
  };
  try {
    yield put(loadingData());
    const response = yield call(postDataRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
    if (response.type.endsWith("_SUCCESS")) {
      yield put(getInitialUserdata());
    }
  } catch (error) {
    yield put(actions.updateNamesFromSkatteverketFail(error.toString()));
  } finally {
    yield put(loadingDataComplete());
  }
}
