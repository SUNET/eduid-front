import { createAction, PayloadAction } from "@reduxjs/toolkit";
import * as accountLinkingActions from "actions/AccountLinking";
import { getAllUserdata, getAllUserdataFail, GET_USERDATA_SUCCESS } from "actions/PersonalData";
import { AllUserData } from "apis/eduidPersonalData";
import { DashboardRootState } from "dashboard-init-app";
import { LOCALIZED_MESSAGES } from "globals";
import { appLoaded } from "login/components/App/App_actions";
import emailsSlice from "reducers/Emails";
import ladokSlice from "reducers/Ladok";
import ninsSlice from "reducers/Nins";
import personalDataSlice, { PersonalDataData } from "reducers/PersonalData";
import phonesSlice from "reducers/Phones";
import { call, put, select } from "redux-saga/effects";
import { checkStatus, failRequest, putCsrfToken } from "sagas/common";
import { getRequest } from "sagas/ts_common";
import { updateIntl } from "../reducers/Internationalisation";

// action to trigger this saga
export const getInitialUserData = createAction("dashboard/getInitialUserData");

/*
 * Bulk-fetch a lot of user data at once from the all-user-data endpoint.
 *
 * After fetching, this saga simulates a number of fetch-responses from the backend,
 * dispatching actions to different reducers that will take care of their slice of the data.
 */
export function* requestAllPersonalData() {
  try {
    yield put(getAllUserdata()); // TODO: Think this is a NO-OP
    const state: DashboardRootState = yield select((state) => state);
    const response: PayloadAction<AllUserData, string, never, boolean> = yield call(fetchAllPersonalData, state.config);

    if (!response) {
      // user was probably not logged in, and the browser is being directed to go to authn at this very moment
      return;
    }

    yield put(putCsrfToken(response));

    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }

    if (response.payload.nins !== undefined) {
      // update nins in the state
      yield put(ninsSlice.actions.setNins(response.payload.nins));
    }
    if (response.payload.emails !== undefined) {
      yield put(emailsSlice.actions.setEmails(response.payload.emails));
    }
    if (response.payload.phones !== undefined) {
      yield put(phonesSlice.actions.setPhones(response.payload.phones));
    }
    if (response.payload.orcid !== undefined) {
      const orcidAction = {
        type: accountLinkingActions.GET_PERSONAL_DATA_ORCID_SUCCESS,
        payload: {
          orcid: response.payload.orcid,
        },
      };
      yield put(orcidAction);
    }
    const pdata: PersonalDataData = {
      given_name: response.payload.given_name,
      surname: response.payload.surname,
      display_name: response.payload.display_name,
      language: response.payload.language,
      eppn: response.payload.eppn,
    };
    // TODO: These next 12 lines are duplicated in the postPersonalDataSaga() saga
    yield put(personalDataSlice.actions.updatePersonalData(pdata));
    if (response.payload.language) {
      const messages = LOCALIZED_MESSAGES as unknown as { [key: string]: { [key: string]: string } };
      if (messages[response.payload.language] !== undefined) {
        yield put(
          updateIntl({
            locale: response.payload.language,
            messages: messages[response.payload.language],
          })
        );
      }
    }

    if (response.payload.ladok !== undefined) {
      yield put(ladokSlice.actions.updateLadok(response.payload.ladok));
    }

    // Dispatch a fake GET_USERDATA_SUCCESS. Will trigger some other sagas that fetch even more info.
    // TODO: these other sagas should maybe be triggered by something else? The appLoaded below perhaps?
    yield put(GET_USERDATA_SUCCESS());

    yield put(appLoaded());
  } catch (error) {
    yield* failRequest(error, getAllUserdataFail);
  }
}

export function fetchAllPersonalData(config: { personal_data_url?: string }) {
  if (!config.personal_data_url) {
    return;
  }

  return window
    .fetch(config.personal_data_url + "all-user-data", {
      ...getRequest,
    })
    .then(checkStatus)
    .then((response) => {
      if (response) return response.json();
    });
}
