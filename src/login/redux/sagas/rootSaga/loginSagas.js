import { takeLatest } from "redux-saga/effects";
import loginSlice from "../../slices/loginSlice";
import { postRefLoginSaga } from "../login/postRefLoginSaga";
import { postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";
import { postTouVersionsSaga } from "../login/postTouVersionsSaga";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";
import { postRefForWebauthnChallengeSaga } from "../login/postRefForWebauthnChallengeSaga";
import { postWebauthnFromAuthenticatorSaga } from "../login/postWebauthnFromAuthenticatorSaga";

const loginSagas = [
  takeLatest(loginSlice.actions.callLoginNext, postRefLoginSaga),
  takeLatest(loginSlice.actions.postUsernamePassword, postUsernamePasswordSaga),
  takeLatest(loginSlice.actions.postTouVersions, postTouVersionsSaga),
  takeLatest(loginSlice.actions.updatedTouAccept, postUpdatedTouAcceptSaga),
  takeLatest(
    loginSlice.actions.postRefForWebauthnChallenge,
    postRefForWebauthnChallengeSaga
  ),
  takeLatest(
    loginSlice.actions.addWebauthnAssertion,
    postWebauthnFromAuthenticatorSaga
  ),
  takeLatest("POST_IDP_MFA_AUTH_FAIL", postRefForWebauthnChallengeSaga),
];

export default loginSagas;
