import { put, select, call } from "redux-saga/effects";
import { startSubmit, stopSubmit, setSubmitSucceeded, setSubmitFailed } from "redux-form";
import { startAsyncValidation, stopAsyncValidation } from "redux-form";
import { updateIntl } from "../reducers/Internationalisation";
import { storeCsrfToken } from "commonConfig";
import { LOCALIZED_MESSAGES, TOKEN_SERVICE_URL } from "../globals";

export const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 0) {
    /* We made the request with `redirect: "manual"` which means the fetch() does not recurse on the
     * redirect the backend gives us when not authenticated. Unfortunately, there doesn't seem to be
     * a way to get the actual Location: header from the response then, so we have to reconstruct it
     * ourselves using TOKEN_SERVICE_URL.
     */
    const next = document.location.href;
    document.location.assign(TOKEN_SERVICE_URL + "?next=" + next);
  } else {
    throw new Error(response.statusText);
  }
};

export const ajaxHeaders = {
  "Content-Type": "application/json; charset=utf-8",
  Accept: "application/json",
  "Accept-Encoding": "gzip,deflate",
  "Cache-Control": "no-store, no-cache, must-revalidate",
  Pragma: "no-cache",
  "X-Requested-With": "XMLHttpRequest",
};

export const postRequest = {
  method: "post",
  redirect: "manual",
  credentials: "include",
  headers: ajaxHeaders,
};

export const getRequest = {
  method: "get",
  redirect: "manual",
  credentials: "include",
  headers: ajaxHeaders,
};

export const putCsrfToken = function (action) {
  const token = action.payload.csrf_token;
  if (token !== undefined) {
    delete action.payload.csrf_token;
    return storeCsrfToken(token);
  } else {
    return { type: "NOOP_ACTION" };
  }
};

export const failRequest = function* (error, failAction) {
  if (
    navigator.userAgent.indexOf("Trident/7") > -1 &&
    (error.toString() === "SyntaxError: Invalid character" || error.toString() === "TypeError: Network request failed")
  ) {
    const next = document.location.href;
    document.location.assign(TOKEN_SERVICE_URL + "?next=" + next);
  } else {
    console.log("Communication error: " + error.toString());
    yield put(failAction(error.toString()));
  }
};

export function saveData(getData, formName, startAction, fetcher, failAction) {
  return function* () {
    try {
      const state = yield select((state) => state);
      const data = getData(state);
      yield put(startAction({ ...data }));
      yield put(startSubmit(formName));
      yield put(startAsyncValidation(formName));
      const resp = yield call(fetcher, state.config, data);
      yield put(putCsrfToken(resp));
      if (resp.type.endsWith("FAIL")) {
        if (resp.payload.error) {
          yield put(setSubmitFailed(formName, resp.payload.error));
          yield put(stopSubmit(formName, resp.payload.error));
        }
      } else {
        yield put(setSubmitSucceeded(formName));
        yield put(stopAsyncValidation(formName));
      }
      const lang = resp.payload.language;
      if (lang) {
        yield put(
          updateIntl({
            locale: lang,
            messages: LOCALIZED_MESSAGES[lang],
          })
        );
      }
      yield put(resp);
    } catch (error) {
      yield* failRequest(error, failAction);
    }
  };
}
