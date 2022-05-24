import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([
    //    takeLatest(GET_SIGNUP_CONFIG, requestConfig),
    // takeLatest(verifiedActions.GET_CODE_STATUS, requestCodeStatus),
  ]);
}

export default rootSaga;
