import { put, select, call } from "redux-saga/effects";
import { checkStatus, putCsrfToken, postRequest, getRequest, failRequest } from "sagas/common";
import * as actions from "actions/Nins";
import { GET_NINS_FAIL } from "reducers/Nins";

export function* requestNins() {
  try {
    yield put(actions.getNins());
    const config = yield select((state) => state.config);
    const nins = yield call(fetchNins, config);
    yield put(putCsrfToken(nins));
    yield put(nins);
  } catch (error) {
    yield* failRequest(error, GET_NINS_FAIL);
  }
}

export function fetchNins(config) {
  return window
    .fetch(config.personal_data_url + "nins", {
      ...getRequest,
    })
    .then(checkStatus)
    .then((response) => response.json());
}

// function to post nins
export function* postNin(nin) {
  try {
    const state = yield select((state) => state),
      data = {
        nin: state.nins.nin, // TODO: We ought to pass nin from the argument, not from the state. Perhaps we can remove state.nins.nin then?
        csrf_token: state.config.csrf_token,
      };
    const resp = yield call(postNinAdd, state.config, data);
    // BUG: the response from the backend contains an empty list of nins, so we fetch it again somewhere after this...
    //      Fix the backend and avoid having to re-fetch nins from the backend.
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.postNinFail);
  }
}

// function to reach endpoint to post nin
export function postNinAdd(config, data) {
  return window
    .fetch("/services/security/" + "add-nin", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* requestRemoveNin() {
  try {
    const state = yield select((state) => state),
      data = {
        nin: state.nins.rmNin,
        csrf_token: state.config.csrf_token,
      };
    const resp = yield call(requestRemove, state.config, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.startRemoveFail);
  }
}

export function requestRemove(config, data) {
  return window
    .fetch(config.security_url + "remove-nin", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}
