import { put, select, call } from "redux-saga/effects";
import { postRequest, checkStatus, saveData } from "../../../sagas/common";
import * as actions from "../../actions/forms";

export function postEmailRequest(config, data) {
  return window
    .fetch(config.password_service_url + "reset/", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => ({
  email: state.login.email,
  csrf_token: state.config.csrf_token
});

export const postEmail = saveData(
  getData,
  "email-input",
  data => ({ type: "NOOP_ACTION" }),
  postEmailRequest,
  actions.saveEmailFail
);

// export function saveData(getData, formName, startAction, fetcher, failAction) {
//   return function*() {
//     try {
//       const state = yield select(state => state);
//       const data = getData(state);
//       yield put(startAction(data));
//       yield put(startSubmit(formName));
//       yield put(startAsyncValidation(formName));
//       const resp = yield call(fetcher, state.config, data);
//       yield put(putCsrfToken(resp));
//       if (resp.type.endsWith("FAIL")) {
//         if (resp.payload.error) {
//           yield put(setSubmitFailed(formName, resp.payload.error));
//           yield put(stopSubmit(formName, resp.payload.error));
//         }
//       } else {
//         yield put(setSubmitSucceeded(formName));
//         yield put(stopAsyncValidation(formName));
//       }
//       const lang = resp.payload.language;
//       if (lang) {
//         yield put(
//           updateIntl({
//             locale: lang,
//             messages: LOCALIZED_MESSAGES[lang]
//           })
//         );
//       }
//       yield put(resp);
//     } catch (error) {
//       yield* failRequest(error, failAction);
//     }
//   };
// }
