import { put, call, select } from "redux-saga/effects";
import * as CBOR from "sagas/cbor";
import { checkStatus,
         postRequest,
         failRequest,
         putCsrfToken} from "sagas/common";

import * as main_actions from "login/LoginMain/LoginMain_actions";
import * as actions from "login/DoReset/DoReset_actions";

import { history } from "login/LoginMain/LoginMain";


export function* postPasswordReset() {
  try {
    const state = yield select(state => state);
    const config = state.config,
      data = {
        code: state.config.email_code,
        password: state.do_reset.new_password,
        csrf_token: state.config.csrf_token,
      };
    const change = yield call(requestPasswordReset, config, data);
    yield put(putCsrfToken(change));
    if (change.payload.error !== undefined) {
      const newpass = change.payload.error.new_password;
      if (newpass) {
        change.payload.error[comp.pwFieldCustomName] = newpass;
        delete change.payload.error.new_password;
      }
    } else {
      history.push('/reset-password/success/');
    }
    yield put(change);
  } catch (error) {
    yield* failRequest(error, actions.resetPasswordFail);
  }
}

export function requestPasswordReset(config, data) {
  return window
    .fetch(config.password_service_url + "reset/new-password/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* postPasswordResetWithSMSCode() {
  try {
    const state = yield select(state => state);
    const config = state.config,
      data = {
        code: state.config.email_code,
        phone_code: state.do_reset.sms_code,
        password: state.do_reset.new_password,
        csrf_token: state.config.csrf_token,
      };
    const change = yield call(requestPasswordResetSMS, config, data);
    yield put(putCsrfToken(change));
    if (change.payload.error !== undefined) {
      put(actions.stopResetPasswordSMS());
      const newpass = change.payload.error.new_password;
      if (newpass) {
        change.payload.error[comp.pwFieldCustomName] = newpass;
        delete change.payload.error.new_password;
      }
    } else if (change.type = actions.DO_RESET_PASSWORD_SMS_SUCESS) {
      history.push('/reset-password/success/');
    }
    yield put(change);
  } catch (error) {
    yield* failRequest(error, actions.resetPasswordSMSFail);
  }
}

export function requestPasswordResetSMS(config, data) {
  return window
    .fetch(config.password_service_url + "reset/new-password-secure-phone/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

function safeEncode(obj) {
  const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
  const unsafeObj = btoa(bytesObj);
  return unsafeObj
    .replace(/\//g, "_")
    .replace(/\+/g, "-")
    .replace(/=*$/, "");
}

export function* postPasswordResetWithToken() {
  try {
    const state = yield select(state => state);
    const assertion = state.do_reset.webauthn_assertion;
    const config = state.config,
      data = {
        code: state.config.email_code,
        password: state.do_reset.new_password,
        credentialId: safeEncode(assertion.rawId),
        authenticatorData: safeEncode(assertion.response.authenticatorData),
        clientDataJSON: safeEncode(assertion.response.clientDataJSON),
        signature: safeEncode(assertion.response.signature),
        csrf_token: state.config.csrf_token,
      };
    const response = yield call(requestPasswordResetToken, config, data);
    yield put(putCsrfToken(response));
    if (response.payload.error !== undefined) {
      const newpass = response.payload.error.new_password;
      if (newpass) {
        response.payload.error[comp.pwFieldCustomName] = newpass;
        delete response.payload.error.new_password;
      }
    } else if (response.type = actions.DO_RESET_PASSWORD_TOKEN_SUCESS) {
      history.push('/reset-password/success/');
    }
    yield put(response);
  } catch (error) {
    yield* failRequest(error, actions.resetPasswordTokenFail);
  }
}

export function requestPasswordResetToken(config, data) {
  return window
    .fetch(config.password_service_url + "reset/new-password-secure-token/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function handleRetry() {
  document.location.reload();
}


let credentials_locked = false;

export function* askForToken() {
  const state = yield select(state => state);
  let assertion = state.do_reset.webauthn_assertion;
  
  if (assertion === null && !credentials_locked) {

    const raw_options = state.config.extra_security.tokens.webauthn_options,
          cooked_options = atob(raw_options.replace(/_/g, "/").replace(/-/g, "+")),
          byte_options = Uint8Array.from(cooked_options, c => c.charCodeAt(0));
    let options = CBOR.decode(byte_options.buffer);

    try {
      options.publicKey = {
        ...options.publicKey,
        challenge: Uint8Array.from(
          Array.prototype.map.call(atob(options.publicKey.challenge), function(
            x
          ) {
            return x.charCodeAt(0);
          })
        )
      };
      const allowCreds = options.publicKey.allowCredentials.map(v => {
        return {
          ...v,
          id: Uint8Array.from(
            Array.prototype.map.call(atob(v.id), function(x) {
              return x.charCodeAt(0);
            })
          )
        };
      });
      options.publicKey.allowCredentials = allowCreds;
    } catch (error) {
      // the credentials were registered as webauthn (not U2F)
      console.log(error);
    }

    if (options.publicKey !== undefined) {
      try {
        credentials_locked = true;
        assertion = yield call(getCredentials, options);
        if (assertion === null) {
          yield put(actions.mfaProblem("mfa.error-getting-token"));
        } else {
          yield put(actions.credentialsGot(assertion));
        }
        credentials_locked = false;
      } catch (error) {
        credentials_locked = false;
        console.log("Error getting credentials:", error);
        yield put(actions.mfaProblem("mfa.error-getting-token"));
      }
    } else {
      console.log("Webauthn data not available yet");
    }
  } else {
    console.log("Webauthn assertion already gotten");
  }
}

function getCredentials (options) {
  return navigator.credentials.get(options);
}
