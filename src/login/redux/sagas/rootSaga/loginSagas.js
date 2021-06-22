import { takeLatest } from "redux-saga/effects";
import * as postRefLoginActions from "../../actions/postRefLoginActions";
import { postRefLoginSaga } from "../login/postRefLoginSaga";
import * as postUsernamePasswordActions from "../../actions/postUsernamePasswordActions";
import { postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";
import * as postUpdatedTouAcceptActions from "../../actions/postUpdatedTouAcceptActions";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";

const loginSagas = [
  takeLatest(postRefLoginActions.POST_LOGIN_REF_TO_NEXT, postRefLoginSaga),
  takeLatest(
    postUsernamePasswordActions.POST_USERNAME_PASSWORD,
    postUsernamePasswordSaga
  ),
  takeLatest(
    postUpdatedTouAcceptActions.POST_UPDATED_TOU_ACCEPT,
    postUpdatedTouAcceptSaga
  ),
  // uncomment to enable call to /next on /pw_auth success
  // takeLatest(
  //   postUsernamePasswordActions.POST_IDP_PW_AUTH_SUCCESS,
  //   postRefLoginSaga
  // ),
];

export default loginSagas;
