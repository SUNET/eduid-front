import { call, select, put } from "redux-saga/effects";
import * as actions from "../../actions/createGroupActions";
import postRequest from "../postDataRequest";
import * as getAllGroupMgmtDataActions from "../../actions/getAllGroupMgmtDataActions";
import { putCsrfToken } from "../../../../sagas/common";

export function* createGroupSaga(action) {
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/create";
  try {
    const dataToSend = {
      display_name: action.payload.display_name,
      csrf_token: state.config.csrf_token,
    };
    const createGroupResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(createGroupResponse));
    yield put(getAllGroupMgmtDataActions.getAllData())
  } catch (error) {
    yield put(actions.createGroupFail(error.toString()));
  }
}
