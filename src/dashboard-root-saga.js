import * as pdataActions from "actions/PersonalData";
import * as securityActions from "actions/Security";
import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { requestNins } from "sagas/Nins";
import { getInitialUserData, requestAllPersonalData } from "sagas/PersonalData";
import {
  beginRegisterWebauthn,
  postDeleteAccount,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
  requestPasswordChange,
  verifyWebauthnToken,
} from "sagas/Security";
import { confirmLetterCode, postRequestLetter } from "./apis/eduidLetterProofing";
import * as updateNamesFromSkatteverketActions from "./login/redux/actions/updateNamesFromSkatteverketActions";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";
import { updateNamesFromSkatteverketSaga } from "./login/redux/sagas/personalData/updateNamesFromSkatteverketSaga";

function* rootSaga() {
  yield all([
    takeLatest(getInitialUserData.type, requestAllPersonalData),
    takeLatest(pdataActions.GET_USERDATA_SUCCESS.type, requestCredentials),
    takeLatest(pdataActions.postUserdata.type, postPersonalDataSaga),
    takeLatest(updateNamesFromSkatteverketActions.UPDATE_NAMES_FROM_SKATTEVERKET, updateNamesFromSkatteverketSaga),
    takeLatest(securityActions.initiatePasswordChange.type, requestPasswordChange),
    takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeEvery(postRequestLetter.fulfilled, requestAllPersonalData),
    takeEvery(confirmLetterCode.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.rejected, requestNins),
    takeLatest(securityActions.START_WEBAUTHN_REGISTRATION, beginRegisterWebauthn),
    takeLatest(securityActions.POST_WEBAUTHN_BEGIN_SUCCESS, registerWebauthn),
    takeLatest(securityActions.POST_WEBAUTHN_REMOVE, removeWebauthnToken),
    takeLatest(securityActions.POST_WEBAUTHN_VERIFY, verifyWebauthnToken),
  ]);
}

export default rootSaga;
