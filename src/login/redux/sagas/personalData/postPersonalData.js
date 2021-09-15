import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../../../actions/PersonalData";
import {
  loadingData,
  loadingDataComplete,
} from "../../actions/loadingDataActions";

export function* postPersonalDataSaga(action) {
  const state = yield select((state) => state);
  const url = state.config.personal_data_url + "user";
  const dataToSend = {
    given_name: action.personalData.given_name,
    surname: action.personalData.surname,
    display_name: action.personalData.display_name,
    language: action.personalData.language,
    csrf_token: state.config.csrf_token,
  };
  try {
    yield put(loadingData());
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield put(actions.postUserdataFail(error.toString()));
  } finally {
    yield put(loadingDataComplete());
  }
}
