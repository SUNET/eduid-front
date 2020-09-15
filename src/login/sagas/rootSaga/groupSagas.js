import { takeLatest } from "redux-saga/effects";
import * as configActions from "../../../actions/DashboardConfig";
import { requestGroupsData } from "../getGroups";
import { requestGroupsAllData } from "../getGroupsAllData";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import { createGroupSaga } from "../../redux/sagas/createGroupSaga";
// console.log("this is requestGroupsData in groupsRootSaga", requestGroupsData);

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  // takeLatest(configActions.GET_INITIAL_USERDATA, requestGroupsData),
  takeLatest(configActions.GET_INITIAL_USERDATA, requestGroupsAllData),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
];

export default groupsSagas;
