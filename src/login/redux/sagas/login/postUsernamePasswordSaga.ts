import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { genericApiFail } from "apis/common";
import { LoginRootState } from "login-init-app";
import { call, put, select } from "redux-saga/effects";
import { putCsrfToken } from "../../../../sagas/common";
import { loadingData, loadingDataComplete } from "../../actions/loadingDataActions";
import loginSlice from "../../slices/loginSlice";
import postRequest from "../postDataRequest";

interface UsernamePassword {
  email: string;
  currentPassword: string;
}

interface UsernamePasswordResponse {
  finished?: boolean;
}

// Action connected to postUsernamePasswordSaga. Will post username and password to the /pw_auth endpoint.
export const callUsernamePasswordSaga = createAction<UsernamePassword>("login/callPostUsernamePassword");

export function* postUsernamePasswordSaga(action: PayloadAction<UsernamePassword>) {
  const state: LoginRootState = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
    username: action.payload.email,
    password: action.payload.currentPassword,
  };
  try {
    yield put(loadingData());
    const response: PayloadAction<UsernamePasswordResponse, string, never, boolean> = yield call(
      postRequest,
      url,
      dataToSend
    );
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
    if (error instanceof Error) {
      yield put(genericApiFail(error.toString()));
    }
  } finally {
    yield put(loadingDataComplete());
  }
}
