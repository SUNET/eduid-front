import { fetchNins } from "apis/eduidPersonalData";
import { put } from "redux-saga/effects";

// wrapper from sagas to thunk, remove as soon as possible
export function* requestNins() {
  yield put(fetchNins());
}
