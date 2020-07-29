// import { push } from "react-router-redux";
import { call, put } from "redux-saga/effects";
import { checkStatus, getRequest } from "../../../../../../sagas/common";
import * as actions from "./Groups_actions";

export function* requestGroupData() {
  const url = GROUP_MGMT_URL + "/groups";
  try {
    console.log("this is url", url);
    const groupDataReponse = yield call(fetchGroups, url);
    console.log("This should be data:", groupDataReponse);
    yield put(groupDataReponse);
  } catch (error) {
    console.log("groups request errored", error.message);
    yield put(actions.getGropusDataFail(error.toString()));
  }
}

export function fetchGroups(url) {
  console.log("groups request url", url);
  const request = {
    ...getRequest,
    redirect: "follow",
  };
  return window
    .fetch(url, {
      ...request,
    })
    .then(checkStatus)
    .then((response) => response.json());
}
