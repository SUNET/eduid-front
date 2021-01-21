import { call, put } from "redux-saga/effects";
import { getData } from "../getDataRequest";
import * as actions from "../../actions/getAllGroupMgmtDataActions";

export function* getAllDataSaga() {
  const url = GROUP_MGMT_URL + "/all-data";
  try {
    const allGroupReponse = yield call(getData, url);
    yield put(allGroupReponse);
  } catch (error) {
    yield put(actions.getAllGroupsDataFail(error.toString()));
  }
}
