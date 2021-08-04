import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postWebauthnFromAuthenticatorActions";
import { safeEncode } from "../../../app_utils/helperFunctions/authenticatorAssertion";

export function* postWebauthnFromAuthenticatorSaga() {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const assertion = state.login.mfa.webauthn_assertion;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    webauthn_response: {
      credentialId: safeEncode(assertion.rawId),
      authenticatorData: safeEncode(assertion.response.authenticatorData),
      clientDataJSON: safeEncode(assertion.response.clientDataJSON),
      signature: safeEncode(assertion.response.signature),
    },
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield put(actions.postWebauthnFromAuthenticatorFail(error.toString()));
  }
}
