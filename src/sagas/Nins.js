import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  getRequest,
  failRequest
} from "sagas/common";
import * as actions from "actions/Nins";

export function* requestNins() {
  try {
    yield put(actions.getNins());
    const config = yield select(state => state.config);
    const nins = yield call(fetchNins, config);
    yield put(putCsrfToken(nins));
    yield put(nins);
  } catch (error) {
    yield* failRequest(error, actions.getNinsFail);
  }
}

export function fetchNins(config) {
  return window
    .fetch(config.personal_data_url + "nins", {
      ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json());
}

// function to post nins
export function* postNin() {
  console.log("you're in postNin");
  try {
    const state = yield select(state => state),
      data = {
        nin: state.nins.nin,
        csrf_token: state.config.csrf_token
      };
    console.log("this is data in postNin:", data);
    const resp = yield call(postNinFetch, state.config, data);
    console.log("this is resp in postNin:", resp);
    console.log("this is token in resp postNin:", resp.payload.csrf_token);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield* failRequest(error, actions.postNinFail);
  }
}

// function to reach endpoint to post nin
export function postNinFetch(config, data) {
  console.log("this is data in postNinFetch:", data);
  return window
    .fetch("/services/security/" + "add-nin", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* requestRemoveNin() {
  try {
    const state = yield select(state => state),
      data = {
        nin: state.nins.rmNin,
        csrf_token: state.config.csrf_token
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
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
