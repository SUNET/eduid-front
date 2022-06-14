import { loadingData, loadingDataComplete } from "login/redux/actions/loadingDataActions";
import * as actions from "login/redux/actions/updateNamesFromSkatteverketActions";
import postDataRequest from "login/redux/sagas/postDataRequest";
import { call, put, select } from "redux-saga/effects";
import { putCsrfToken } from "sagas/common";
import { getInitialUserData } from "sagas/PersonalData";

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
      yield put(getInitialUserData());
    }
  } catch (error) {
    yield put(actions.updateNamesFromSkatteverketFail(error.toString()));
  } finally {
    yield put(loadingDataComplete());
  }
}
