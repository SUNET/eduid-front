import { call, select, put } from "redux-saga/effects";
import postRequest from "../postDataRequest";
import { updateIntl } from "../../../../reducers/Internationalisation";
import { putCsrfToken } from "../../../../sagas/common";
import * as actions from "../../../../actions/PersonalData";
import { loadingData, loadingDataComplete } from "../../actions/loadingDataActions";
import { eduidRMAllNotify } from "../../../../actions/Notifications";
import { LOCALIZED_MESSAGES } from "globals";
import { DashboardRootState } from "dashboard-init-app";
import personalDataSlice, { PersonalDataData } from "reducers/PersonalData";
import { PayloadAction } from "@reduxjs/toolkit";

export function* postPersonalDataSaga(action: PayloadAction<PersonalDataData>) {
  const state: DashboardRootState = yield select((state) => state);
  const url = state.config.personal_data_url + "user";
  const dataToSend = {
    given_name: action.payload.given_name,
    surname: action.payload.surname,
    display_name: action.payload.display_name,
    language: action.payload.language,
    csrf_token: state.config.csrf_token,
  };
  try {
    yield put(loadingData());
    const response: PayloadAction<PersonalDataData, string, never, boolean> = yield call(postRequest, url, dataToSend);

    yield put(putCsrfToken(response));
    if (response.error) {
      // Errors are handled in notifyAndDispatch() (in notify-middleware.js)
      yield put(response);
      return;
    }
    // TODO: These next 12 lines are duplicated in the requestAllPersonalData() saga
    yield put(personalDataSlice.actions.updatePersonalData(response.payload));
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
    yield put(eduidRMAllNotify());
  } catch (error) {
    if (error instanceof Error) {
      yield put(actions.postUserdataFail(error.toString()));
    } else {
      throw error;
    }
  } finally {
    yield put(loadingDataComplete());
  }
}
