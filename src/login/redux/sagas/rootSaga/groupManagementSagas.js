import { takeLatest } from "redux-saga/effects";
import * as allDataActions from "../../actions/getAllDataGroupActions";
import * as createGroupActions from "../../actions/createGroupActions";
import * as createInviteActions from "../../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../../actions/getOutgoingInvitesActions";
import { allDataSaga } from "../groups/allDataSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
import { createInviteSaga } from "../groups/createInviteSaga";
import { allOutgoingInvitesSaga } from "../groups/allOutgoingInvitesSaga";

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(allDataActions.GET_ALL_DATA, allDataSaga),
  takeLatest(createGroupActions.CREATE_GROUP, createGroupSaga),
  // cretaion of an invite leads to req for all outgoing invites
  takeLatest(createInviteActions.CREATE_INVITE, createInviteSaga),
  takeLatest(
    getOutgoingInvitesActions.GET_ALL_OUTGOING_INVITES,
    allOutgoingInvitesSaga
  ),
];

export default groupsSagas;
