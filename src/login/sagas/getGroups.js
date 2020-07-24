// import { push } from "react-router-redux";
import { call } from "redux-saga/effects";
import { getData } from "./getData";

export function* requestGroupsData() {
  const url = GROUP_MGMT_URL + "/groups";
  try {
    console.log("this is url", url);
    const groupsReponse = yield call(getData, url);
    console.log("This should be groupsReponse:", groupsReponse);
    // yield put(groupDataReponse);
  } catch (error) {
    console.log("groups request errored", error.message);
    // yield put(actions.actionFail(error.toString()));
  }
}
