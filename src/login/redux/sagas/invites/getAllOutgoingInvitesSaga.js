import { call, put } from "redux-saga/effects";
import { getData } from "../getDataRequest";
import * as actions from "../../actions/getOutgoingInvitesActions";
import { GROUP_MGMT_URL } from "globals";

export function* getAllOutgoingInvitesSaga() {
  const url = GROUP_MGMT_URL + "/invites/outgoing";
  try {
    const allOutgoingInvitesResponse = yield call(getData, url);
    yield put(allOutgoingInvitesResponse);
  } catch (error) {
    yield put(actions.getAllOutgoingInvitesFail(error.toString()));
  }
}
