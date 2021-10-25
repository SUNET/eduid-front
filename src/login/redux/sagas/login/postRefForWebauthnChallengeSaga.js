import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import { mfaDecodeMiddleware } from "../../../app_utils/helperFunctions/authenticatorAssertion";
import loginSlice from "../../slices/loginSlice";

// Saga to get a webauthn challenge from the /mfa_auth endpoint.
export function* postRefForWebauthnChallengeSaga() {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
  };
  try {
    const response = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    if (response.payload.finished) {
      yield put(loginSlice.actions.callLoginNext());
    }
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    const decodedResponse = mfaDecodeMiddleware(response);
    yield put(
      loginSlice.actions.postIdpMfaAuthSuccess(decodedResponse.payload)
    );
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail(error.toString()));
  }
}
