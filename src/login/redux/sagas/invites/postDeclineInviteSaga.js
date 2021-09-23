import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import * as actions from "../../actions/postDeclineInviteActions";
import { putCsrfToken } from "../../../../sagas/common";

export function* postDeclineInviteSaga(action) {
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/invites/decline";
  try {
    const dataToSend = {
      group_identifier: action.payload.group_identifier,
      email_address: action.payload.email_address,
      role: action.payload.role,
      csrf_token: state.config.csrf_token,
    };
    const response = yield call(postRequest, url, dataToSend);
   console.log("response", response);
    // yield put(putCsrfToken(reponse));
    // yield put(reponse);
  } catch (error) {
    yield put(actions.declineInviteFail(error.toString()));
  }
}
