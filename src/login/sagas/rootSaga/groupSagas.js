import { takeLatest } from "redux-saga/effects";
import * as configActions from "../../../actions/DashboardConfig";
import * as createGroupActions from "../../redux/actions/createGroupActions";
import { allDataSaga } from "../../redux/sagas/groupSagas/allDataSaga";
 import { requestGroupsData } from "../getGroups";
import { createGroupSaga } from "../../redux/sagas/groupSagas/createGroupSaga";
// console.log("this is requestGroupsData in groupsRootSaga", requestGroupsData);

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  // takeLatest(configActions.GET_INITIAL_USERDATA, requestGroupsData),
  takeLatest(configActions.GET_INITIAL_USERDATA, allDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
];

export default groupsSagas;
