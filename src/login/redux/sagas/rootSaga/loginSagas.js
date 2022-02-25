import { takeLatest } from "redux-saga/effects";
import loginSlice from "../../slices/loginSlice";
import { callUsernamePasswordSaga, postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";
import { postTouVersionsSaga } from "../login/postTouVersionsSaga";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";
import { postRefForWebauthnChallengeSaga } from "../login/postRefForWebauthnChallengeSaga";
import { postWebauthnFromAuthenticatorSaga } from "../login/postWebauthnFromAuthenticatorSaga";
import { performAuthentication } from "../../../app_utils/helperFunctions/navigatorCredential";

const loginSagas = [
  takeLatest(callUsernamePasswordSaga, postUsernamePasswordSaga),
  takeLatest(loginSlice.actions.postTouVersions, postTouVersionsSaga),
  takeLatest(loginSlice.actions.updatedTouAccept, postUpdatedTouAcceptSaga),
  // fetch a webauthn challenge from the backend
  takeLatest(loginSlice.actions.postRefForWebauthnChallenge, postRefForWebauthnChallengeSaga),
  // send a webauthn assertion to the backend
  takeLatest(performAuthentication.fulfilled, postWebauthnFromAuthenticatorSaga),
  takeLatest("POST_IDP_MFA_AUTH_FAIL", postRefForWebauthnChallengeSaga),
];

export default loginSagas;
