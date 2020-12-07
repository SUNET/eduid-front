import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  failRequest
} from "sagas/common";
import * as actions from "../actions/OpenidConnect";
import { postOpenidSelegFail } from "../actions/OpenidConnect";

export function* checkNINAndShowSelegModal() {
  try {
    let nin;
    const state = yield select(state => state),
      input = document.getElementById("nin"),
      unconfirmed = document.getElementById("eduid-unconfirmed-nin");

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
      yield put(actions.postOpenidSelegFail("oc.error_missing_nin"));
    } else {
      yield put(actions.postOpenidSeleg(nin));
    }
  } catch (error) {
    yield* failRequest(error, postOpenidSelegFail);
  }
}

export function* requestOpenidQRcode() {
  const state = yield select(state => state),
    openid_url = state.config.oidc_proofing_url,
    data = {
      csrf_token: state.config.csrf_token,
      nin: state.openid_data.nin
    };
  console.log("Getting opaque data for NIN: " + state.openid_data.nin);
  const oidcData = yield call(fetchQRcode, openid_url, data);
  yield put(putCsrfToken(oidcData));
  yield put(oidcData);
}

export function fetchQRcode(url, data) {
  return window
    .fetch(url, {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
