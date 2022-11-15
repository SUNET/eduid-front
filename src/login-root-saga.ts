import loginSagas from "login/redux/sagas/rootSaga/loginSagas";
import { all } from "redux-saga/effects";

function* rootSaga() {
  yield all([...loginSagas]);
}

export default rootSaga;
