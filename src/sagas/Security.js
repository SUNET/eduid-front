import { put, select, call } from "redux-saga/effects";
import { checkStatus, putCsrfToken, getRequest, postRequest, failRequest } from "sagas/common";
import {
  getCredentials,
  getCredentialsFail,
  getPasswordChangeFail,
  postConfirmDeletion,
  accountRemovedFail,
  tokenRemovedFail,
  registerWebauthnFail,
  beginWebauthnFail,
  POST_WEBAUTHN_BEGIN_SUCCESS,
} from "actions/Security";
import { tokenVerifyFail } from "../actions/Security";

import { safeEncode, safeDecodeCBOR } from "sagas/common";

export function* requestCredentials() {
  try {
    yield put(getCredentials());
    const config = yield select((state) => state.config);
    const credentials = yield call(fetchCredentials, config);
    yield put(putCsrfToken(credentials));
    yield put(credentials);
  } catch (error) {
    yield* failRequest(error, getCredentialsFail);
  }
}

export function fetchCredentials(config) {
  return window
    .fetch(config.security_url + "credentials", {
      ...getRequest,
    })
    .then(checkStatus)
    .then((response) => response.json());
}

// perform re-authentication when entering "change password" mode
export function* requestPasswordChange(win) {
  try {
    const config = yield select((state) => state.config),
      tsURL = config.token_service_url,
      chpassURL = tsURL + "chpass",
      dashURL = config.dashboard_url,
      nextURL = dashURL + "chpass", // the "chpass" path will route to the ChangePasswordContainer when we get back
      url = chpassURL + "?next=" + encodeURIComponent(nextURL);

    if (win !== undefined && win.location !== undefined) {
      win.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch (error) {
    yield* failRequest(error, getPasswordChangeFail);
  }
}

// export function* requestDeleteAccount(win) {
//   try {
//     yield put(stopConfirmationDeletion());
//     const config = yield select(state => state.config);
//     let tsURL = config.token_service_url;
//     let nextURL = "delete-account";
//     let url = tsURL + "?next=" + nextURL;

//     if (win !== undefined && win.location !== undefined) {
//       win.location.href = url;
//     } else {
//       window.location.href = url;
//     }
//   } catch (error) {
//     yield* failRequest(error, removeAccountFail);
//   }
// }

export function* postDeleteAccount() {
  try {
    yield put(postConfirmDeletion());
    const state = yield select((state) => state);
    const data = {
      csrf_token: state.config.csrf_token,
    };
    const resp = yield call(deleteAccount, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, accountRemovedFail);
  }
}

export function deleteAccount(config, data) {
  return window
    .fetch(config.security_url + "terminate-account", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* removeWebauthnToken() {
  try {
    const state = yield select((state) => state);
    const data = {
      csrf_token: state.config.csrf_token,
      credential_key: state.security.webauthn_token_remove,
    };
    const resp = yield call(removeToken, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, tokenRemovedFail);
  }
}

export function removeToken(config, data) {
  return window
    .fetch(config.security_url + "webauthn/remove", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* verifyWebauthnToken(win) {
  try {
    const state = yield select((state) => state);
    const keyHandle = state.security.webauthn_token_verify;

    let idpParam = "?idp=" + state.config.token_verify_idp;
    let url = state.config.eidas_url + "verify-token/" + keyHandle + idpParam;

    if (win !== undefined && win.location !== undefined) {
      win.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch (error) {
    yield* failRequest(error, tokenVerifyFail);
  }
}

//TODO: remove after convert to thunk
// export function* beginRegisterWebauthn() {
//   try {
//     const state = yield select((state) => state);
//     //if (state.security.webauthn_options.hasOwnProperty('publicKey')) {return}
//     const data = {
//       csrf_token: state.config.csrf_token,
//       authenticator: state.security.webauthn_authenticator,
//     };
//     const action = yield call(beginWebauthnRegistration, state.config, data);
//     if (action.type === POST_WEBAUTHN_BEGIN_SUCCESS) {
//       yield put(putCsrfToken(action));
//       if (action.payload.registration_data !== undefined) {
//         const attestation = yield call(
//           navigator.credentials.create.bind(navigator.credentials),
//           action.payload.registration_data
//         );
//         action.payload.attestation = attestation;
//       }
//     }
//     yield put(action);
//   } catch (error) {
//     console.log("Problem beginning webauthn registration", error);
//     yield* failRequest(error, beginWebauthnFail);
//   }
// }

// export function beginWebauthnRegistration(config, data) {
//   return window
//     .fetch(config.security_url + "webauthn/register/begin", {
//       ...postRequest,
//       body: JSON.stringify(data),
//     })
//     .then(checkStatus)
//     .then((response) => response.json())
//     .then((response) => {
//       if (response.payload.registration_data !== undefined) {
//         response.payload.registration_data = safeDecodeCBOR(response.payload.registration_data);
//       }
//       console.log("Action config: ", response);
//       return response;
//     });
// }

export function* registerWebauthn() {
  try {
    const state = yield select((state) => state);
    const attestation = state.security.webauthn_attestation,
      data = {
        csrf_token: state.config.csrf_token,
        attestationObject: safeEncode(attestation.response.attestationObject),
        clientDataJSON: safeEncode(attestation.response.clientDataJSON),
        credentialId: attestation.id,
        description: state.security.webauthn_token_description,
      };
    const result = yield call(webauthnRegistration, state.config, data);
    yield put(putCsrfToken(result));
    yield put(result);
  } catch (error) {
    yield* failRequest(error, registerWebauthnFail);
  }
}

export function webauthnRegistration(config, data) {
  return window
    .fetch(config.security_url + "webauthn/register/complete", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}
