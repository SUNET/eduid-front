import { takeLatest } from "redux-saga/effects";
import * as allDataActions from "../../actions/getAllDataGroupActions";
import * as createGroupActions from "../../actions/createGroupActions";
import * as inviteActions from "../../actions/inviteActions";
import { allDataSaga } from "../groups/allDataSaga"
import { createGroupSaga } from "../groups/createGroupSaga";
import { createInviteSaga } from "../groups/createInviteSaga";

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(allDataActions.GET_ALL_DATA, allDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
  takeLatest(inviteActions.CREATE_INVITE, createInviteSaga),
];

export default groupsSagas;
