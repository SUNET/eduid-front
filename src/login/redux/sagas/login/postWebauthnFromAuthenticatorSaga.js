import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";

export function* postWebauthnFromAuthenticatorSaga() {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    webauthn_response: state.login.mfa.webauthn_assertion,
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
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail());
  }
}
