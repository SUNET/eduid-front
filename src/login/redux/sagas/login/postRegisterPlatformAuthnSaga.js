import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  putCsrfToken,
  postRequest,
  failRequest
} from "../../../../sagas/common";
import {
  beginWebauthnFail,
  POST_WEBAUTHN_BEGIN_SUCCESS
} from "../../../../actions/Security";

import { safeDecodeCBOR } from "sagas/common";


export function* beginRegisterPlatformAuthn() {
    try {
      const state = yield select(state => state);
      //if (state.security.webauthn_options.hasOwnProperty('publicKey')) {return}
      const data = {
        csrf_token: state.config.csrf_token,
        authenticator:  "platform",
      };
      const action = yield call(beginWebauthnRegistration, state.config, data);
      if (action.type === POST_WEBAUTHN_BEGIN_SUCCESS) {
        yield put(putCsrfToken(action));
        if (action.payload.registration_data !== undefined) {
          const attestation = yield call(
            navigator.credentials.create.bind(navigator.credentials),
            action.payload.registration_data
          );
          action.payload.attestation = attestation;
          console.log("attestation",attestation)
        }

      }
      yield put(action);
    } catch (error) {
      console.log("Problem begining webauthn registration", error);
      yield* failRequest(error, beginWebauthnFail);
    }
  }

  export function beginWebauthnRegistration(config, data) {
    return window
      .fetch("https://dashboard.eduid.docker/"+ "webauthn/register/begin", {
        ...postRequest,
        body: JSON.stringify(data)
      })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => {
        if (response.payload.registration_data !== undefined) {
          response.payload.registration_data = safeDecodeCBOR(
            response.payload.registration_data
          );
        }
        console.log("Action config: ", response);
        return response;
      });
  }