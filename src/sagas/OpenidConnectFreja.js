import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  getRequest,
  failRequest
} from "sagas/common";
import * as actions from "actions/OpenidConnectFreja";

export function* checkNINAndShowFrejaModal() {
  try {
    let nin;
    const input = document.getElementById("nin"),
      unconfirmed = document.getElementById("eduid-unconfirmed-nin"),
      state = yield select(state => state);

    // Check if there is a pending NIN before trying form input
    if (unconfirmed) nin = state.nins.nin;
    if (!nin) {
      if (!input) {
        if (!unconfirmed) {
          nin = "testing";
        }
      } else {
        nin = input.value ? input.value : "no nin";
      }
    }

    if (nin === "no nin") {
      yield put(actions.showOpenidFrejaModalFail("ocf.error_missing_nin"));
    } else {
      yield put(actions.showOpenidFrejaModalSuccess(nin));
    }
  } catch (error) {
    yield* failRequest(error, actions.showOpenidFrejaModalFail);
  }
}

export function* closeFrejaModal() {
  yield put(actions.hideOpenidFrejaModalSuccess());
}

export function* initializeOpenidFrejaData() {
  try {
    const state = yield select(state => state),
      openid_freja_url = state.config.oidc_proofing_freja_url,
      data = {
        nin: state.openid_freja_data.nin,
        csrf_token: state.config.csrf_token
      };

    console.log("Getting opaque data for NIN: " + state.openid_freja_data.nin);

    if (state.openid_freja_data.nin === "") {
      yield put(actions.postOpenidFrejaFail("ocf.error_missing_nin"));
    } else {
      const oidcFrejaData = yield call(fetchFrejaData, openid_freja_url, data);
      yield put(putCsrfToken(oidcFrejaData));
      yield put(oidcFrejaData);
      if (oidcFrejaData.payload.iaRequestData) {
        yield (window.location.href =
          "frejaeid://identify?iaRequestData=" +
          oidcFrejaData.payload.iaRequestData);
      }
    }
  } catch (error) {
    yield* failRequest(error, actions.postOpenidFrejaFail);
  }
}

export function* requestOpenidFrejaData() {
  try {
    const openid_freja_url = yield select(
      state => state.config.oidc_proofing_freja_url
    );
    console.log("Checking for existing opaque data");
    const oidcFrejaData = yield call(fetchFrejaData, openid_freja_url);
    yield put(putCsrfToken(oidcFrejaData));
    yield put(oidcFrejaData);
  } catch (error) {
    yield* failRequest(error, actions.getOpenidFrejaFail);
  }
}

export function fetchFrejaData(url, data) {
  let options = {
    ...getRequest
  };
  if (data) {
    options["body"] = JSON.stringify(data);
    options["method"] = "POST";
  }
  return window
    .fetch(url, options)
    .then(checkStatus)
    .then(response => response.json());
}
