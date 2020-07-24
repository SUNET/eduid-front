// import { push } from "react-router-redux";
import { call } from "redux-saga/effects";
import { getData } from "./getData";
// import { checkStatus, getRequest } from "../../../../../../sagas/common";

export function* requestGroupsAllData() {
  const url = GROUP_MGMT_URL + "/all-data";
  try {
    console.log("this is url", url);
    const allGroupReponse = yield call(getData, url);
    console.log("This should be allGroupReponse:", allGroupReponse);
    // yield put(groupDataReponse);
  } catch (error) {
    console.log("groups request errored", error.message);
    // yield put(actions.actionFail(error.toString()));
  }
}
