import { takeLatest } from "redux-saga/effects";

import * as actions from "actions/ActionMain";
import { requestConfig, requestNextAction } from "sagas/ActionMain";

const defaultSaga = [
  takeLatest(actions.GET_ACTIONS_CONFIG, requestConfig),
  takeLatest(actions.POST_ACTIONS_ACTION_SUCCESS, requestNextAction)
];

export default defaultSaga;
