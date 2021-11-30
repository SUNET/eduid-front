import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRootState } from "../../../app_init/initStore";

export type SAMLParameters = { SAMLResponse: string; RelayState?: string };

export type NextResponse = {
  // The response from the /next API endpoint consists of (in the happy case):
  //   action: what action the backed requires next, or FINISHED
  //   target: the API endpoint for the next action
  //   parameters: SAML parameters for completing the FINISHED 'action'
  action: string;
  target: string;
  parameters?: SAMLParameters;
};

// Call the /next endpoint to see what the backend requires us to do to proceed with this login.
export function* postRefLoginSaga() {
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.next_url;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
  };
  if (state.login.ref === undefined) {
    // workaround for Login and ResetPassword having to share sagas reacting to GET_JSCONFIG_LOGIN_CONFIG_SUCCESS
    return undefined;
  }
  try {
    const response: PayloadAction<NextResponse, string, never, boolean> = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(loginSlice.actions.postIdpNextSuccess(response.payload));
    yield put(eduidRMAllNotify());
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail());
  }
}
