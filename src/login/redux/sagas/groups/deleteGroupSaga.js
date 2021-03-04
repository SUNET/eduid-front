import { call, select, put } from "redux-saga/effects";
import * as actions from "../../actions/deleteGroupActions";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";

export function* deleteGroupSaga(action) {
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/delete";
  try {
    const dataToSend = {
      group_identifier: action.payload.group_identifier,
      csrf_token: state.config.csrf_token,
    };
    const deleteGroupResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(deleteGroupResponse));
    yield put(deleteGroupResponse);
  } catch (error) {
    yield put(actions.deleteGroupFail(error.toString()));
  }
}
