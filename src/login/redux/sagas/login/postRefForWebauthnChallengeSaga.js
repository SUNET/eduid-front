import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as CBOR from "../../../../sagas/cbor";
import * as actions from "../../actions/postRefForWebauthnChallengeActions";

export function* postRefForWebauthnChallengeSaga() {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  try {
    const dataToSend = {
      ref: state.login.ref,
      csrf_token: state.config.csrf_token,
    };
    const encodedWebauthnChallenge = yield call(postRequest, url, dataToSend);
    const decodedWebauthnChallenge = mfaDecodeMiddleware(
      encodedWebauthnChallenge
    );
    yield put(putCsrfToken(decodedWebauthnChallenge));
    yield put(decodedWebauthnChallenge);
  } catch (error) {
    yield put(actions.postRefForWebauthnChallengeFail(error.toString()));
  }
}

window.CBOR = CBOR;
const mfaDecodeMiddleware = (response) => {
  if (response.payload && response.payload.webauthn_options !== undefined) {
    const raw_options = response.payload.webauthn_options;
    const options = atob(raw_options.replace(/_/g, "/").replace(/-/g, "+"));
    const byte_options = Uint8Array.from(options, (c) => c.charCodeAt(0));
    response.payload.webauthn_options = CBOR.decode(byte_options.buffer);
  }
  return response;
};
