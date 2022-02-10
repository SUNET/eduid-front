import { put, select, call } from "redux-saga/effects";
import { checkStatus, putCsrfToken, failRequest } from "sagas/common";
import { postRequest } from "sagas/ts_common";
import letterProofingSlice from "reducers/LetterProofing";
import { DashboardRootState } from "dashboard-init-app";
import { PayloadAction } from "@reduxjs/toolkit";
import { LetterProofingResponse } from "apis/letterProofing";

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
