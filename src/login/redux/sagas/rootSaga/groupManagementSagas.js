import { takeLatest, takeEvery } from "redux-saga/effects";
import * as createGroupActions from "../../actions/createGroupActions";
import * as createInviteActions from "../../actions/createInviteActions";
import * as deleteGroupActions from "../../actions/deleteGroupActions";
import * as pdataActions from "../../../../actions/PersonalData";
import * as acceptInviteActions from "../../actions/postAcceptInviteActions";
import * as declineInviteActions from "../../actions/postDeclineInviteActions";
import { getAllDataSaga } from "../groups/getAllDataSaga";
import { createGroupSaga } from "../groups/createGroupSaga";
import { createInviteSaga } from "../invites/createInviteSaga";
import { getAllOutgoingInvitesSaga } from "../invites/getAllOutgoingInvitesSaga";
import { deleteGroupSaga } from "../groups/deleteGroupSaga";
import { getIncomingInvitesSaga } from "../invites/getIncomingInvitesSaga";
import { postAcceptInviteSaga } from "../invites/postAcceptInviteSaga";
import { postDeclineInviteSaga } from "../invites/postDeclineInviteSaga";

// connecting actions (redux) with sagas (fetch)
const groupsSagas = [
  takeLatest(pdataActions.GET_USERDATA_SUCCESS, getAllDataSaga),
  takeLatest(pdataActions.GET_USERDATA_SUCCESS, getAllOutgoingInvitesSaga),
  takeLatest(pdataActions.GET_USERDATA_SUCCESS, getIncomingInvitesSaga),
  takeLatest(createGroupActions.POST_CREATE_GROUP, createGroupSaga),
  takeEvery(createInviteActions.CREATE_INVITE_MEMBER, createInviteSaga),
  takeEvery(createInviteActions.CREATE_INVITE_OWNER, createInviteSaga),
  takeEvery(acceptInviteActions.ACCEPT_INVITE_MEMBER, postAcceptInviteSaga),
  takeEvery(acceptInviteActions.ACCEPT_INVITE_OWNER, postAcceptInviteSaga),
  takeEvery(declineInviteActions.DECLINE_INVITE_MEMBER, postDeclineInviteSaga),
  takeEvery(declineInviteActions.DECLINE_INVITE_OWNER, postDeclineInviteSaga),
  takeLatest(deleteGroupActions.POST_DELETE_GROUP, deleteGroupSaga),
];

export default groupsSagas;
