import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../actions/postRefForWebauthnChallengeActions";
import { mfaDecodeMiddleware } from "../../../app_utils/helperFunctions/authenticatorAssertion";

export function* postRefForWebauthnChallengeSaga() {
  const state = yield select((state) => state);
  const url = state.login.post_to;
  const dataToSend = {
    ref: state.login.ref,
    csrf_token: state.config.csrf_token,
  };
  try {
    const encodedChallenge = yield call(postRequest, url, dataToSend);
    const decodedChallenge = mfaDecodeMiddleware(encodedChallenge);
    yield put(putCsrfToken(decodedChallenge));
    yield put(decodedChallenge);
  } catch (error) {
    yield put(actions.postRefForWebauthnChallengeFail(error.toString()));
  }
}