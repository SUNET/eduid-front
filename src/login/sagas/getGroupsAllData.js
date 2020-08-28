import { call, put } from "redux-saga/effects";
import { getData } from "./getData";
import * as actions from "../redux/actions/getAllGroupsData_actions";

export function* requestGroupsAllData() {
  const url = GROUP_MGMT_URL + "/all-data";
  try {
    console.log("this is url", url);
    const allGroupReponse = yield call(getData, url);
    yield put(allGroupReponse);
  } catch (error) {
    yield put(actions.getAllGroupsDataFail(error.toString()));
  }
}
