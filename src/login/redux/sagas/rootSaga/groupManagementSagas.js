import { takeLatest, takeEvery } from "redux-saga/effects";
import * as allDataActions from "../../actions/getAllGroupMgmtDataActions";
import * as createGroupActions from "../../actions/createGroupActions";
import * as createInviteActions from "../../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../../actions/getOutgoingInvitesActions";
import * as deleteGroupActions from "../../actions/deleteGroupActions";
import * as pdataActions from "actions/PersonalData";
import { getAllDataSaga } from "../groups/getAllDataSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
import { createInviteSaga } from "../invites/createInviteSaga";
import { getAllOutgoingInvitesSaga } from "../invites/getAllOutgoingInvitesSaga";
import { deleteGroupSaga } from "../groups/deleteGroupSaga";

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(pdataActions.GET_USERDATA_SUCCESS, getAllDataSaga),
  takeLatest(pdataActions.GET_USERDATA_SUCCESS, getAllOutgoingInvitesSaga),
  takeLatest(createGroupActions.POST_CREATE_GROUP, createGroupSaga),
  takeEvery(createInviteActions.CREATE_INVITE_MEMBER, createInviteSaga),
  takeEvery(createInviteActions.CREATE_INVITE_OWNER, createInviteSaga),
  takeLatest(deleteGroupActions.POST_DELETE_GROUP, deleteGroupSaga),
];

export default groupsSagas;
