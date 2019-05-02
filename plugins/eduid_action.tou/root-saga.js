import { takeLatest, takeEvery } from "redux-saga/effects";
import { call, put, select } from "redux-saga/effects";

import defaultSaga from "plugins-saga";
import * as actions from "actions/ActionWrapper";
import { postRequest, checkStatus, putCsrfToken } from "sagas/common";

export function requestPostAcceptTOU(data) {
  const url = "post-action";
  return window
    .fetch(url, {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export function* postAcceptTOU() {
  try {
    const state = yield select(state => state),
      data = {
        accept: true,
        version: state.plugin.version,
        csrf_token: state.config.csrf_token
      };
    const resp = yield call(requestPostAcceptTOU, data);
    yield put(putCsrfToken(resp));
    yield put(resp);
  } catch (error) {
    yield put(actions.postActionFail(error.toString()));
  }
}

function* rootSaga() {
  yield [
    ...defaultSaga,
    takeLatest(actions.POST_ACTIONS_ACTION, postAcceptTOU)
  ];
}

export default rootSaga;
