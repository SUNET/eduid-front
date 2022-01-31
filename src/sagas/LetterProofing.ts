import { put, select, call } from "redux-saga/effects";
import { checkStatus, putCsrfToken, failRequest } from "sagas/common";
import { getRequest, postRequest } from "sagas/ts_common";
import letterProofingSlice from "reducers/LetterProofing";
import { DashboardRootState } from "dashboard-init-app";
import { PayloadAction } from "@reduxjs/toolkit";

interface LetterProofingResponse {
  letter_expired?: boolean;
  letter_expires?: string;
  letter_expires_in_day?: number;
  letter_sent?: string;
  letter_sent_days_ago?: number;
  message?: string;
  code?: string;
}

export function* sendGetLetterProofing() {
  try {
    const state: DashboardRootState = yield select((state) => state),
      nin = state.nins.nin;
    const response: PayloadAction<LetterProofingResponse, string, never, boolean> = yield call(
      fetchGetLetterProofing,
      state.config,
      nin
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(letterProofingSlice.actions.getLetterProofingSuccess(response.payload));
  } catch (error) {
    yield* failRequest(error, letterProofingSlice.actions.letterProofingSagaFail);
  }
}

export function fetchGetLetterProofing(config: { letter_proofing_url: string }) {
  return window
    .fetch(config.letter_proofing_url + "proofing", {
      ...getRequest,
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* sendLetterProofing() {
  try {
    const state: DashboardRootState = yield select((state) => state),
      data = {
        nin: state.nins.nin,
        csrf_token: state.config.csrf_token,
      };
    const response: PayloadAction<LetterProofingResponse, string, never, boolean> = yield call(
      fetchLetterProofing,
      state.config,
      data
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(letterProofingSlice.actions.postLetterProofingSuccess(response.payload));
  } catch (error) {
    yield* failRequest(error, letterProofingSlice.actions.letterProofingSagaFail);
    // yield* failRequest(error, actions.postLetterProofingSendLetterFail);
  }
}

export function fetchLetterProofing(config: { letter_proofing_url: string }, data: object) {
  return window
    .fetch(config.letter_proofing_url + "proofing", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}

export function* sendLetterCode() {
  try {
    const state: DashboardRootState = yield select((state) => state),
      data = {
        code: state.letter_proofing.code,
        csrf_token: state.config.csrf_token,
      };

    const response: PayloadAction<LetterProofingResponse, string, never, boolean> = yield call(
      fetchLetterCode,
      state.config,
      data
    );
    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    yield put(letterProofingSlice.actions.postLetterProofingCodeSuccess());
  } catch (error) {
    yield* failRequest(error, letterProofingSlice.actions.letterProofingSagaFail);
    // yield* failRequest(error, actions.postLetterProofingVerificationCodeFail);
  }
}

export function fetchLetterCode(config: { letter_proofing_url: string }, data: object) {
  return window
    .fetch(config.letter_proofing_url + "verify-code", {
      ...postRequest,
      body: JSON.stringify(data),
    })
    .then(checkStatus)
    .then((response) => response.json());
}
