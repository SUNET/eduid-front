import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  failRequest
} from "sagas/common";
import { postLogoutFail, POST_AUTHN_LOGOUT_SUCCESS } from "actions/Header";

export function* requestLogout() {
  try {
    const state = yield select(state => state),
      url = state.config.token_service_url + "logout";
    if (navigator.userAgent.indexOf("Trident/7") > -1) {
      window.location = url;
    } else {
      window
        .fetch(url, {
          method: "get",
          credentials: "same-origin",
          mode: "cors",
          redirect: "manual"
        })
        .then(resp => {
          window.location = resp.url;
        });
    }
  } catch (error) {
    yield* failRequest(error, postLogoutFail);
  }
}
