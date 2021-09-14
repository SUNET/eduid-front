import { put, call, select } from "redux-saga/effects";
import {
  failRequest,
  putCsrfToken
} from "../../../../sagas/common";
import postRequest from "../postDataRequest";
import { setNewPasswordExtraSecurityTokenFail } from "../../actions/postResetNewPasswordActions";
import { history } from "../../../components/App/App";
import { safeEncode } from "../../../app_utils/helperFunctions/authenticatorAssertion";

export function* postSetNewPasswordExtraSecurityToken() {
  const state = yield select(state => state);
  const url = state.config.reset_password_url + "new-password-extra-security-token/";
  const data = {
    email_code: state.resetPassword.email_code,
    password: state.resetPassword.new_password,
    authenticatorData: safeEncode(state.resetPassword.webauthn_assertion.response.authenticatorData),
    clientDataJSON: safeEncode(state.resetPassword.webauthn_assertion.response.clientDataJSON),
    signature: safeEncode(state.resetPassword.webauthn_assertion.response.signature),
    credentialId: safeEncode(state.resetPassword.webauthn_assertion.rawId),
    csrf_token: state.config.csrf_token,
  };
  try {
    const resp = yield call(postRequest, url, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
    if(resp.type === "POST_RESET_PASSWORD_NEW_PASSWORD_EXTRA_SECURITY_TOKEN_SUCCESS"){
      return history.push(`/reset-password/success`);
    }
  }
  catch (error) {
    yield* failRequest(error, setNewPasswordExtraSecurityTokenFail(error));
  }
}