import { createAction } from "@reduxjs/toolkit";

export const useLoginRef = createAction("useLoginRef");

// Common action to signal a caught exception in one of the login app sagas. Because it ends in _FAIL,
// the notifyAndDispatch() middleware will inform the user that the operation failed.
export const loginSagaFail = createAction(
  "LOGIN_SAGA_FAIL",
  function prepare(err) {
    return {
      error: true,
      payload: {
        message: "login.general_failure",
        // Store the javascript error in 'info' because 'message' is removed in notifyAndDispatch()
        // so it becomes more laborious to figure out what the problem was when looking in the developer tools.
        info: err,
      },
    };
  }
);

// Action connected to postUsernamePasswordSaga. Will post username and password to the /pw_auth endpoint.
export const postUsernamePassword = createAction(
  "postUsernamePassword",
  function prepare(username, password) {
    return {
      payload: {
        username: username,
        password: password,
      },
    };
  }
);

// Action connected to postTouVersionsSaga. Posts the versions of the ToU available in this bundle to the /tou endpoint.
export const postTouVersions = createAction("postTouVersions");

// Action connected to postUpdatedTouAcceptSaga. Will post the version of the ToU the user accepts to the /tou endpoint.
export const updatedTouAccept = createAction("updatedTouAccept");

// Action connected to postRefForWebauthnChallengeSaga. Fetches a webauthn challenge from the /mfa_auth endpoint.
export const postRefForWebauthnChallenge = createAction(
  "postRefForWebauthnChallenge"
);
