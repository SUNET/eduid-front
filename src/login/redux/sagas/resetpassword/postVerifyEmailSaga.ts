import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import { ExtraSecurityType } from "../../../redux/slices/resetPasswordSlice";
import { LoginRootState } from "login-init-app";
import { useHistory } from "react-router";

export type VerifyEmailResponse = {
  email_address: string;
  email_code: string;
  extra_security: ExtraSecurityType;
  suggested_password: string;
};

export function* requestLinkCode() {
  const history = useHistory();
  const state: LoginRootState = yield select((state) => state);
  const url = state.config.reset_password_url + "verify-email/";
  const locationUrl = document.location.href;
  if (state.resetPassword.email_code) {
    const data = {
      email_code: state.resetPassword.email_code,
      csrf_token: state.config.csrf_token,
    };
    try {
      const response: PayloadAction<VerifyEmailResponse, string, never, boolean> = yield call(postRequest, url, data);
      yield put(putCsrfToken(response));
      if (response.error) {
        // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
        yield put(response);
        history.push(`/reset-password/email`);
        return;
      }
      // if API call successfully post data save it to store
      yield put(resetPasswordSlice.actions.resetPasswordVerifyEmailSuccess(response.payload));
      // Completed with freja eid location changes to set-new-password
      if (locationUrl.includes("set-new-password")) {
        history.push(`/reset-password/set-new-password/${data.email_code}`);
      } else {
        history.push(`/reset-password/extra-security/${data.email_code}`);
      }
    } catch (error) {
      yield* failRequest(error, resetPasswordSlice.actions.resetPasswordSagaFail());
    }
  }
}
