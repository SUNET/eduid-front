import * as headerActions from "actions/Header";
import * as openidActions from "actions/OpenidConnect";
import * as openidFrejaActions from "actions/OpenidConnectFreja";
import * as pdataActions from "actions/PersonalData";
import * as securityActions from "actions/Security";
import { lookupMobileProofing } from "apis/eduidLookupMobileProofing";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { requestLogout } from "sagas/Header";
import { requestNins } from "sagas/Nins";
import * as sagasOpenid from "sagas/OpenidConnect";
import * as sagasOpenidFreja from "sagas/OpenidConnectFreja";
import { getInitialUserData, requestAllPersonalData } from "sagas/PersonalData";
import { postDeleteAccount, removeWebauthnToken, requestPasswordChange, verifyWebauthnToken } from "sagas/Security";
import { confirmLetterCode, postRequestLetter } from "./apis/eduidLetterProofing";
import * as updateNamesFromSkatteverketActions from "./login/redux/actions/updateNamesFromSkatteverketActions";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";
import { updateNamesFromSkatteverketSaga } from "./login/redux/sagas/personalData/updateNamesFromSkatteverketSaga";

function* rootSaga() {
  yield all([
    takeLatest(getInitialUserData.type, requestAllPersonalData),
    takeLatest(pdataActions.postUserdata.type, postPersonalDataSaga),
    takeLatest(updateNamesFromSkatteverketActions.UPDATE_NAMES_FROM_SKATTEVERKET, updateNamesFromSkatteverketSaga),
    takeLatest(openidActions.SHOW_OIDC_SELEG_MODAL, sagasOpenid.checkNINAndShowSelegModal),
    takeLatest(openidActions.POST_OIDC_PROOFING_PROOFING, sagasOpenid.requestOpenidQRcode),
    takeLatest(openidFrejaActions.POST_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.initializeOpenidFrejaData),
    takeLatest(openidFrejaActions.GET_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.requestOpenidFrejaData),
    takeLatest(openidFrejaActions.SHOW_OIDC_FREJA_MODAL, sagasOpenidFreja.checkNINAndShowFrejaModal),
    takeLatest(openidFrejaActions.HIDE_OIDC_FREJA_MODAL, sagasOpenidFreja.closeFrejaModal),
    takeLatest(securityActions.initiatePasswordChange.type, requestPasswordChange),
    // takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeEvery(postRequestLetter.fulfilled, requestAllPersonalData),
    takeEvery(confirmLetterCode.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.fulfilled, requestAllPersonalData),
    takeEvery(lookupMobileProofing.rejected, requestNins),
    takeEvery(openidActions.POST_OIDC_PROOFING_PROOFING_SUCCESS, requestNins),
    takeEvery(openidFrejaActions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS, requestNins),
    takeEvery(headerActions.POST_LOGOUT, requestLogout),
    // takeLatest(securityActions.POST_WEBAUTHN_REMOVE, removeWebauthnToken),
    // takeLatest(securityActions.POST_WEBAUTHN_VERIFY, verifyWebauthnToken),
  ]);
}

export default rootSaga;
