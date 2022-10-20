import * as pdataActions from "actions/PersonalData";
import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { requestNins } from "sagas/Nins";
import { getInitialUserData, requestAllPersonalData } from "sagas/PersonalData";
import { confirmLetterCode, postRequestLetter } from "./apis/eduidLetterProofing";
import * as updateNamesFromSkatteverketActions from "./login/redux/actions/updateNamesFromSkatteverketActions";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";
import { updateNamesFromSkatteverketSaga } from "./login/redux/sagas/personalData/updateNamesFromSkatteverketSaga";

function* rootSaga() {
  yield all([
    takeLatest(getInitialUserData.type, requestAllPersonalData),
    takeLatest(pdataActions.postUserdata.type, postPersonalDataSaga),
    takeLatest(updateNamesFromSkatteverketActions.UPDATE_NAMES_FROM_SKATTEVERKET, updateNamesFromSkatteverketSaga),
    takeEvery(postRequestLetter.fulfilled, requestAllPersonalData),
    takeEvery(confirmLetterCode.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.rejected, requestNins),
  ]);
}

export default rootSaga;
