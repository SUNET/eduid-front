import { takeLatest, takeEvery } from "redux-saga/effects";
import * as postRefLoginActions from "../../actions/postRefLoginActions";
import { postRefLoginSaga } from "../login/postRefLoginSaga";
import * as postUsernamePasswordActions from "../../actions/postUsernamePasswordActions";
import { postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";

const loginSagas = [
  takeLatest(postRefLoginActions.POST_LOGIN_REF_TO_NEXT, postRefLoginSaga),
  takeLatest(
    postUsernamePasswordActions.POST_USERNAME_PASSWORD,
    postUsernamePasswordSaga
  ),
  takeLatest(
    postUsernamePasswordActions.POST_IDP_PW_AUTH_SUCCESS,
    postRefLoginSaga
  ),
];

export default loginSagas;
