import { call, put } from "redux-saga/effects";
import { getData } from "../../../sagas/getData";
import * as actions from "../../actions/getAllGroupsDataActions";

export function* allDataSaga() {
  const url = GROUP_MGMT_URL + "/all-data";
  try {
    console.log("this is url", url);
    const allGroupReponse = yield call(getData, url);
    yield put(allGroupReponse);
  } catch (error) {
    yield put(actions.getAllGroupsDataFail(error.toString()));
  }
}
