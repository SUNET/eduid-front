import { takeLatest } from "redux-saga/effects";
import * as errorsMainActions from "./login/redux/actions/ErrorsMain";
import { requestConfig } from "./login/redux/sagas/ErrorsMain";

function* rootSaga() {
  yield [
    takeLatest(errorsMainActions.APP_LOADED, requestConfig),
  ];
}

export default rootSaga;
