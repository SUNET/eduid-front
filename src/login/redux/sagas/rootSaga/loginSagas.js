import { takeLatest } from "redux-saga/effects";
import * as loginActions from "../../actions/loginActions";
import { postRefLoginSaga } from "../login/postRefLoginSaga";
import { postUsernamePasswordSaga } from "../login/postUsernamePasswordSaga";
import { postTouVersionsSaga } from "../login/postTouVersionsSaga";
import { postUpdatedTouAcceptSaga } from "../login/postUpdatedTouAcceptSaga";
import { postRefForWebauthnChallengeSaga } from "../login/postRefForWebauthnChallengeSaga";
import { postWebauthnFromAuthenticatorSaga } from "../login/postWebauthnFromAuthenticatorSaga";
import * as addDataToStoreActions from "../../actions/addDataToStoreActions";

const loginSagas = [
  takeLatest(loginActions.useLoginRef.toString(), postRefLoginSaga),
  takeLatest(
    loginActions.postUsernamePassword.toString(),
    postUsernamePasswordSaga
  ),
  takeLatest(loginActions.postTouVersions.toString(), postTouVersionsSaga),
  takeLatest(
    loginActions.updatedTouAccept.toString(),
    postUpdatedTouAcceptSaga
  ),
  takeLatest(
    loginActions.postRefForWebauthnChallenge.toString(),
    postRefForWebauthnChallengeSaga
  ),
  takeLatest(
    addDataToStoreActions.addWebauthnAssertion.toString(),
    postWebauthnFromAuthenticatorSaga
  ),
  takeLatest("POST_IDP_MFA_AUTH_FAIL", postRefForWebauthnChallengeSaga),
];

export default loginSagas;
