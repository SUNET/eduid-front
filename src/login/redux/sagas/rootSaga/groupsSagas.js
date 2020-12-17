import { takeLatest } from "redux-saga/effects";
import * as allDataActions from "../../actions/getAllDataGroupActions";
import * as createGroupActions from "../../actions/createGroupActions";
import { allDataSaga } from "../groups/allDataSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
// console.log("this is groupsSaga in groupsSagas", groupsSaga);

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(allDataActions.GET_ALL_DATA, allDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
];

export default groupsSagas;
