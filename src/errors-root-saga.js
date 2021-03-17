import { takeLatest } from "redux-saga/effects";
import * as errorsMainActions from "./login/redux/actions/errorsMainActions";
import { requestConfig } from "./login/redux/sagas/ErrorsMain";

function* rootSaga() {
  yield [
    takeLatest(errorsMainActions.APP_LOADED, requestConfig),
  ];
}

export default rootSaga;
