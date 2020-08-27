import { takeLatest } from "redux-saga/effects";
import * as configActions from "../../../actions/DashboardConfig";
import { requestGroupsData } from "../getGroups";
import { requestGroupsAllData } from "../getGroupsAllData";

// console.log("this is requestGroupsData in groupsRootSaga", requestGroupsData);

const groupsSagas = [
  // takeLatest(configActions.GET_INITIAL_USERDATA, requestGroupsData),
  takeLatest(configActions.GET_INITIAL_USERDATA, requestGroupsAllData),
];

export default groupsSagas;
