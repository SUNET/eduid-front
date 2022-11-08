import { takeLatest } from "redux-saga/effects";
import loginSlice from "../../slices/loginSlice";
import { postTouVersionsSaga } from "../login/postTouVersionsSaga";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";
import { callUsernamePasswordSaga, postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";

const loginSagas = [
  takeLatest(callUsernamePasswordSaga, postUsernamePasswordSaga),
  takeLatest(loginSlice.actions.postTouVersions, postTouVersionsSaga),
  takeLatest(loginSlice.actions.updatedTouAccept, postUpdatedTouAcceptSaga),
];

export default loginSagas;
