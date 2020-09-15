import { takeLatest } from "redux-saga/effects";
import * as configActions from "../../../../actions/DashboardConfig";
import * as createGroupActions from "../../actions/createGroupActions";
import { allDataSaga } from "../groupSagas/allDataSaga";
import { groupsSaga } from "../groupSagas/groupsSaga";
import { createGroupSaga } from "../groupSagas/createGroupSaga";
// console.log("this is groupsSaga in groupsSagas", groupsSaga);

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  // takeLatest(configActions.GET_INITIAL_USERDATA, groupsSaga),
  takeLatest(configActions.GET_INITIAL_USERDATA, allDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
];

export default groupsSagas;
