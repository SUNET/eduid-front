import { takeLatest } from "redux-saga/effects";
import * as postRefLoginActions from "../../actions/postRefLoginActions";
import { postRefLoginSaga } from "../login/postRefLoginSaga";
import * as postUsernamePasswordActions from "../../actions/postUsernamePasswordActions";
import { postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";
import * as postTouVersionsActions from "../../actions/postTouVersionsActions";
import { postTouVersionsSaga } from "../login/postTouVersionsSaga";
import * as postUpdatedTouAcceptActions from "../../actions/postUpdatedTouAcceptActions";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";
import * as postRefForWebauthnChallengeActions from "../../actions/postRefForWebauthnChallengeActions";
import { postRefForWebauthnChallengeSaga } from "../login/postRefForWebauthnChallengeSaga";
import { postWebauthnFromAuthenticatorSaga } from "../login/postWebauthnFromAuthenticatorSaga";
import * as addDataToStoreActions from "../../actions/addDataToStoreActions";

const loginSagas = [
  takeLatest(postRefLoginActions.POST_LOGIN_REF_TO_NEXT, postRefLoginSaga),
  takeLatest(
    postUsernamePasswordActions.POST_USERNAME_PASSWORD,
    postUsernamePasswordSaga
  ),
  takeLatest(postTouVersionsActions.POST_TOU_VERSIONS, postTouVersionsSaga),
  takeLatest(
    postUpdatedTouAcceptActions.POST_UPDATED_TOU_ACCEPT,
    postUpdatedTouAcceptSaga
  ),
  takeLatest(
    postRefForWebauthnChallengeActions.POST_REF_WEBAUTHN_CHALLENGE,
    postRefForWebauthnChallengeSaga
  ),
  takeLatest(
    postRefForWebauthnChallengeActions.POST_IDP_MFA_AUTH_SUCCESS,
    postRefLoginSaga
  ),
  takeLatest(
    addDataToStoreActions.ADD_WEBAUTHN_ASSERTION_TO_STORE,
    postWebauthnFromAuthenticatorSaga
  ),
];

export default loginSagas;
