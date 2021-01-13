import { takeLatest } from "redux-saga/effects";
import * as allDataActions from "../../actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../../actions/createGroupActions";
import * as createInviteActions from "../../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../../actions/getOutgoingInvitesActions";
import { getAllDataSaga } from "../groups/getAllDataSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
import { createInviteSaga } from "../invites/createInviteSaga";
import { getAllOutgoingInvitesSaga } from "../invites/getAllOutgoingInvitesSaga";

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(allDataActions.GET_ALL_DATA, getAllDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
  // cretaion of an invite leads to req for all outgoing invites
  takeLatest(createInviteActions.CREATE_INVITE, createInviteSaga),
  takeLatest(
    getOutgoingInvitesActions.GET_ALL_OUTGOING_INVITES,
    getAllOutgoingInvitesSaga
  ),
];

export default groupsSagas;
