import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import loginSlice from "../../slices/loginSlice";
import { clearNotifications } from "../../../../reducers/Notifications";
import { PayloadAction } from "@reduxjs/toolkit";
import { LoginRootState } from "../../../app_init/initStore";
import { LoginNextResponse } from "apis/eduidLogin";

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
    const response: PayloadAction<LoginNextResponse, string, never, boolean> = yield call(postRequest, url, dataToSend);
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(loginSlice.actions.postIdpNextSuccess(response.payload));
    yield put(clearNotifications());
  } catch (error) {
    yield put(loginSlice.actions.loginSagaFail());
  }
}
