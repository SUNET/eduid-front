import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import * as actions from "../../actions/createInviteActions";
import * as getOutgoingInvitesActions from "../../actions/getOutgoingInvitesActions";
import { putCsrfToken } from "../../../../sagas/common";

export function* createInviteSaga(action) {
  // select(state) only to get csrf_token from redux store
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/invites/create";
  try {
    // set data to send in POST
    const dataToSend = {
      group_identifier: action.payload.group_identifier,
      email_address: action.payload.email_address,
      role: action.payload.role,
      csrf_token: state.config.csrf_token,
    };
    const createInviteReponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(createInviteReponse));
    yield put(getOutgoingInvitesActions.getAllOutgoingInvites())
  } catch (error) {
    yield put(actions.createInviteFail(error.toString()));
  }
}
