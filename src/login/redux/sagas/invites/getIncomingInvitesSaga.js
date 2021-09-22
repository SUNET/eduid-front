import { call, put } from "redux-saga/effects";
import { getData } from "../getDataRequest";
import * as actions from "../../actions/getIncomingActions";

export function* getIncomingInvitesSaga() {
  const url = GROUP_MGMT_URL + "/invites/incoming";
  try {
    const response = yield call(getData, url);
    yield put(response);
  } catch (error) {
    yield put(actions.getIncomingInvitesFail(error.toString()));
  }
}
