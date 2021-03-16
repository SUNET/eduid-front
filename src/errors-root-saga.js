import { takeLatest } from "redux-saga/effects";
import * as errorsMainActions from "actions/ErrorsMain";
import { requestConfig } from "sagas/ErrorsMain";

function* rootSaga() {
  yield [
    takeLatest(errorsMainActions.APP_LOADED, requestConfig),
  ];
}

export default rootSaga;
