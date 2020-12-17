import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  putCsrfToken,
  postRequest,
  getRequest,
  failRequest
} from "sagas/common";
import * as actions from "actions/AccountLinking";

export function* requestOrcid() {
  try {
    yield put(actions.getOrcid());
    const config = yield select(state => state.config);
    const orcid = yield call(fetchOrcid, config);
    yield put(putCsrfToken(orcid));
    yield put(orcid);
  } catch (error) {
    yield* failRequest(error, actions.getOrcidFail);
  }
}

export function* requestConnectOrcid(win) {
  try {
    const config = yield select(state => state.config);
    let url = config.orcid_url + "authorize";

    if (win !== undefined && win.location !== undefined) {
      win.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch (error) {
    yield* failRequest(error, actions.startOrcidConnectFail);
  }
}

export function fetchOrcid(config) {
  return window
    .fetch(config.orcid_url, {
      ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestRemoveOrcid() {
  try {
    const config = yield select(state => state.config),
      data = {
        csrf_token: config.csrf_token
      };
    const resp = yield call(removeOrcid, config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.startOrcidRemoveFail);
  }
}

export function removeOrcid(config, data) {
  return window
    .fetch(config.orcid_url + "remove", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
