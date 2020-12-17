import { call, put } from "redux-saga/effects";
import { getData } from "../getDataRequest";
import * as actions from "../../actions/getOutgoingInvitesActions";

export function* getAllOutgoingInvitesSaga() {
  const url = GROUP_MGMT_URL + "/invites/outgoing";
  try {
    const allOutgoingInvitesResponse = yield call(getData, url);
    yield put(allOutgoingInvitesResponse);
  } catch (error) {
    yield put(actions.getAllOutgoingInvitesFail(error.toString()));
  }
}
