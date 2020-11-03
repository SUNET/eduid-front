import { put, select, call } from "redux-saga/effects";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  postRequest,
  getRequest,
  failRequest
} from "sagas/common";
import * as actions from "actions/LetterProofing";

export function* sendGetLetterProofing() {
  try {
    const state = yield select(state => state),
      nin = state.nins.nin;
    const response = yield call(fetchGetLetterProofing, state.config, nin);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield* failRequest(error, actions.getLetterProofingStateFail);
  }
}

export function fetchGetLetterProofing(config, nin) {
  return window
    .fetch(config.letter_proofing_url + "proofing?nin=" + nin, {
      ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* sendLetterProofing() {
  try {
    const state = yield select(state => state),
      data = {
        nin: state.nins.nin,
        csrf_token: state.config.csrf_token
      };

    const response = yield call(fetchLetterProofing, state.config, data);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    console.log("error", error);
    yield* failRequest(error, actions.postLetterProofingSendLetterFail);
  }
}

export function fetchLetterProofing(config, data) {
  return window
    .fetch(config.letter_proofing_url + "proofing", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* sendLetterCode() {
  try {
    const state = yield select(state => state),
      data = {
        code: state.letter_proofing.code,
        csrf_token: state.config.csrf_token
      };

    const response = yield call(fetchLetterCode, state.config, data);
    yield put(putCsrfToken(response));
    yield put(response);
  } catch (error) {
    yield* failRequest(error, actions.postLetterProofingVerificationCodeFail);
  }
}

export function fetchLetterCode(config, data) {
  return window
    .fetch(config.letter_proofing_url + "verify-code", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}
