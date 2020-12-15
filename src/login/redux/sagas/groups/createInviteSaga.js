import { call, put } from "redux-saga/effects";
import postDataRequest from "../postDataRequest";
import * as actions from "../../actions/getAllDataGroupActions";

export function* createInviteSaga() {
  const url = GROUP_MGMT_URL + "/invites/create";
  try {
    console.log("this is url", url);
    const createInviteReponse = yield call(postData, url);
    console.log("this is createInviteReponse", createInviteReponse);
    // yield put(allGroupReponse);
  } catch (error) {
    console.log("something went wrong");
    //yield put(actions.getAllGroupsDataFail(error.toString()));
  }
}
