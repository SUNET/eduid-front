import { put, select, call } from "redux-saga/effects";
import { updateIntl } from "react-intl-redux";
import {
  checkStatus,
  ajaxHeaders,
  putCsrfToken,
  getRequest,
  postRequest,
  saveData,
  failRequest
} from "sagas/common";
import {
  getAllUserdata,
  getAllUserdataFail,
  postUserdataFail
} from "actions/PersonalData";

import * as ninActions from "actions/Nins";
import * as emailActions from "actions/Emails";
import * as phoneActions from "actions/Mobile";
import * as pdataActions from "actions/PersonalData";
import * as accountLinkingActions from "actions/AccountLinking";

export function* requestAllPersonalData() {
  try {
    yield put(getAllUserdata());
    const config = yield select(state => state.config);
    let userdata = yield call(fetchAllPersonalData, config);
    yield put(putCsrfToken(userdata));
    if (userdata.type === pdataActions.GET_ALL_USERDATA_SUCCESS) {
      const nins = userdata.payload.nins;
      delete userdata.payload.nins;
      if (nins !== undefined) {
        const ninAction = {
          type: ninActions.GET_NINS_SUCCESS,
          payload: {
            nins: nins
          }
        };
        yield put(ninAction);
      }
      const emails = userdata.payload.emails;
      delete userdata.payload.emails;
      if (emails !== undefined) {
        const emailAction = {
          type: emailActions.GET_EMAILS_SUCCESS,
          payload: {
            emails: emails
          }
        };
        yield put(emailAction);
      }
      const phones = userdata.payload.phones;
      delete userdata.payload.phones;
      if (phones !== undefined) {
        const phoneAction = {
          type: phoneActions.GET_MOBILES_SUCCESS,
          payload: {
            phones: phones
          }
        };
        yield put(phoneAction);
      }
      const orcid = userdata.payload.orcid;
      delete userdata.payload.orcid;
      if (orcid !== undefined) {
        const orcidAction = {
          type: accountLinkingActions.GET_PERSONAL_DATA_ORCID_SUCCESS,
          payload: {
            orcid: orcid
          }
        };
        yield put(orcidAction);
      }
      userdata.type = pdataActions.GET_USERDATA_SUCCESS;
      yield put(userdata);
      const lang = userdata.payload.language;
      if (lang) {
        yield put(
          updateIntl({
            locale: lang,
            messages: LOCALIZED_MESSAGES[lang]
          })
        );
      }
    } else {
      yield put(userdata);
    }
  } catch (error) {
    yield* failRequest(error, getAllUserdataFail);
  }
}

export function fetchAllPersonalData(config) {
  return window
    .fetch(config.PERSONAL_DATA_URL + "all-user-data", {
      ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json());
}

const getData = state => {
  const data = {
    ...state.form.personal_data.values,
    csrf_token: state.config.csrf_token
  };
  delete data.eppn;
  return data;
};

export function sendPersonalData(config, data) {
  return window
    .fetch(config.PERSONAL_DATA_URL + "user", {
      ...postRequest,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json());
}

export const savePersonalData = saveData(
  getData,
  "personal_data",
  pdataActions.changeUserdata,
  sendPersonalData,
  postUserdataFail
);
