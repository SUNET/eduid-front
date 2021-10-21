import { put, call, select } from "redux-saga/effects";
import { failRequest, putCsrfToken } from "../../../../sagas/common";
import resetPasswordSlice from "../../slices/resetPasswordSlice";
import postRequest from "../postDataRequest";
import { history } from "../../../components/App/App";
import { mfaDecodeMiddlewareForResetPassword } from "../../../app_utils/helperFunctions/authenticatorAssertion";

export function* requestLinkCode() {
  const state = yield select((state) => state);
  const url = state.config.reset_password_url + "verify-email/";
  if (state.resetPassword.email_code) {
    const data = {
      email_code: state.resetPassword.email_code,
      csrf_token: state.config.csrf_token,
    };
    try {
      const response = yield call(postRequest, url, data);
      yield put(putCsrfToken(response));
      if (response.error) {
        // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
        yield put(response);
        return history.push(`/reset-password/email`);
      }
      const decodedResponse = mfaDecodeMiddlewareForResetPassword(response);
      // if API call successfully post data save it to store
      yield put(
        resetPasswordSlice.actions.resetPasswordVerifyEmailSuccess(
          decodedResponse.payload
        )
      );
      return history.push(`/reset-password/extra-security/${data.email_code}`);
    } catch (error) {
      yield* failRequest(
        error,
        resetPasswordSlice.actions.resetPasswordSagaFail(error)
      );
    }
  }
}
