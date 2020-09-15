import { call, select, put } from "redux-saga/effects";
import * as actions from "../actions/createGroupActions";
import postRequest from "./postDataRequest";
import { putCsrfToken } from "../../../sagas/common";

// saga determining what data going into the POST request and what happens when the response (_SUCESS and _FAIL) is back
export function* createGroupSaga(action) {
  // select(state) only to get csrf_token from redux store
  const state = yield select((state) => state);
  const url = GROUP_MGMT_URL + "/create";
  try {
    // set data to send in POST
    const dataToSend = {
      display_name: action.payload.display_name,
      csrf_token: state.config.csrf_token,
    };
    // console.log("this is dataToSend:", dataToSend);
    // console.log("this is url:", url);
    const createGroupResponse = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(createGroupResponse));
  } catch (error) {
    // console.log("groups request errored", error.message);
    yield put(actions.createGroupFail(error.toString()));
  }
}
