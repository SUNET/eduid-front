import { put, select, call } from "redux-saga/effects";
import { checkStatus, putCsrfToken, postRequest, failRequest } from "sagas/common";
import { getPasswordChangeFail, postConfirmDeletion, accountRemovedFail, tokenRemovedFail } from "actions/Security";
import { tokenVerifyFail } from "../actions/Security";

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

// export function* removeWebauthnToken() {
//   try {
//     const state = yield select((state) => state);
//     const data = {
//       csrf_token: state.config.csrf_token,
//       credential_key: state.security.webauthn_token_remove,
//     };
//     const resp = yield call(removeToken, state.config, data);
//     yield put(putCsrfToken(resp));
//     yield put(resp);
//   } catch (error) {
//     yield* failRequest(error, tokenRemovedFail);
//   }
// }

// export function removeToken(config, data) {
//   return window
//     .fetch(config.security_url + "webauthn/remove", {
//       ...postRequest,
//       body: JSON.stringify(data),
//     })
//     .then(checkStatus)
//     .then((response) => response.json());
// }

// export function* verifyWebauthnToken(win) {
//   try {
//     const state = yield select((state) => state);
//     const keyHandle = state.security.webauthn_token_verify;

//     let idpParam = "?idp=" + state.config.token_verify_idp;
//     let url = state.config.eidas_url + "verify-token/" + keyHandle + idpParam;

//     if (win !== undefined && win.location !== undefined) {
//       win.location.href = url;
//     } else {
//       window.location.href = url;
//     }
//   } catch (error) {
//     yield* failRequest(error, tokenVerifyFail);
//   }
// }
