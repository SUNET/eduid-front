import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  saveData,
  failRequest
} from "sagas/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";
import * as ninActions from "actions/Nins";

export function* requestLookupMobileProof() {
  try {
    const state = yield select(state => state),
      input = document.getElementsByName("nin")[0],
      unconfirmed = document.getElementById("eduid-unconfirmed-nin"),
      nin = input ? input.value : unconfirmed ? state.nins.nin : "testing",
      data = {
        nin: nin,
        csrf_token: state.config.csrf_token
      };

    const lookupMobileData = yield call(fetchLookupMobileProof, state.config, data);
    yield put(putCsrfToken(lookupMobileData));
    yield put(lookupMobileData);
  } catch (error) {
    yield* failRequest(error, postLookupMobileFail);
  }
}

export function fetchLookupMobileProof(config, data) {
  const url = config.LOOKUP_MOBILE_PROOFING_URL;
  return window
    .fetch(url, {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
const getData = state => {
  const input = document.getElementsByName("nin")[0],
        unconfirmed = document.getElementById("eduid-unconfirmed-nin"),
        nin = input ? input.value : unconfirmed ? state.nins.nin : "testing";
  return {
    nin: nin,
    csrf_token: state.config.csrf_token
  };
};

export const saveLMPNinData = saveData(
  getData,
  "nins",
  ninActions.changeNindata,
  fetchLookupMobileProof,
  postLookupMobileFail
);
