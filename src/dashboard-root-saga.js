import * as pdataActions from "actions/PersonalData";
import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { requestNins } from "sagas/Nins";
import { getInitialUserData, requestAllPersonalData } from "sagas/PersonalData";
import { confirmLetterCode, postRequestLetter } from "./apis/eduidLetterProofing";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";

function* rootSaga() {
  yield all([
    takeLatest(getInitialUserData.type, requestAllPersonalData),
    takeLatest(pdataActions.postUserdata.type, postPersonalDataSaga),
    takeEvery(postRequestLetter.fulfilled, requestAllPersonalData),
    takeEvery(confirmLetterCode.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.rejected, requestNins),
  ]);
}

export default rootSaga;
