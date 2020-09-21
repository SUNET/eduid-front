import { takeLatest } from "redux-saga/effects";
import * as configActions from "../../../../actions/DashboardConfig";
import * as createGroupActions from "../../actions/createGroupActions";
import { allDataSaga } from "../groups/allDataSaga";
import { groupsSaga } from "../groups/groupsSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
// console.log("this is groupsSaga in groupsSagas", groupsSaga);

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  // takeLatest(configActions.GET_INITIAL_USERDATA, groupsSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
];

export default groupsSagas;
