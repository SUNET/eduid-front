import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import * as actions from "../../actions/postAcceptInviteActions";
import { putCsrfToken } from "../../../../sagas/common";

export function* postAcceptInviteSaga(action) {
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/invites/accept";
  try {
    const dataToSend = {
      group_identifier: action.payload.group_identifier,
      email_address: action.payload.email_address,
      role: action.payload.role,
      csrf_token: state.config.csrf_token,
    };
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield put(actions.acceptInviteFail(error.toString()));
  }
}
