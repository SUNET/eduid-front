import * as accountLinkingActions from "actions/AccountLinking";
import * as configActions from "actions/DashboardConfig";
import * as emailActions from "actions/Emails";
import * as headerActions from "actions/Header";
import letterProofingSlice from "reducers/LetterProofing";
import * as lmpActions from "actions/LookupMobileProofing";
import * as mobileActions from "actions/Mobile";
import * as ninActions from "actions/Nins";
import * as openidActions from "actions/OpenidConnect";
import * as openidFrejaActions from "actions/OpenidConnectFreja";
import * as pdataActions from "actions/PersonalData";
import * as securityActions from "actions/Security";
import ninsSlice from "reducers/Nins";
import { put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { requestConnectOrcid, requestOrcid, requestRemoveOrcid } from "sagas/AccountLinking";
import { requestConfig } from "sagas/DashboardConfig";
import {
  requestMakePrimaryEmail,
  requestRemoveEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  saveEmail,
} from "sagas/Emails";
import { requestLogout } from "sagas/Header";
import { sendLetterCode } from "sagas/LetterProofing";
import { saveLMPNinData } from "sagas/LookupMobileProofing";
import * as sagasMobile from "sagas/Mobile";
import { postNin, requestNins, requestRemoveNin } from "sagas/Nins";
import * as sagasOpenid from "sagas/OpenidConnect";
import * as sagasOpenidFreja from "sagas/OpenidConnectFreja";
import { requestAllPersonalData } from "sagas/PersonalData";
import {
  beginRegisterWebauthn,
  postDeleteAccount,
  registerWebauthn,
  removeWebauthnToken,
  requestCredentials,
  requestPasswordChange,
  verifyWebauthnToken,
} from "sagas/Security";
import * as updateNamesFromSkatteverketActions from "./login/redux/actions/updateNamesFromSkatteverketActions";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";
import { updateNamesFromSkatteverketSaga } from "./login/redux/sagas/personalData/updateNamesFromSkatteverketSaga";
import groupsSagas from "./login/redux/sagas/rootSaga/groupManagementSagas";

function* configSaga() {
  yield put(configActions.getInitialUserdata());
}

// get cookie status out of store
export const getCookieStatus = (state) => state.groups.hasCookie;
// allow access based on status
function* allowGroupsSagas() {
  let hasCookie = yield select(getCookieStatus);
  if (hasCookie) {
    yield [...groupsSagas];
  }
}

function* rootSaga() {
  yield [
    takeLatest(configActions.GET_JSCONFIG_CONFIG, requestConfig),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, configSaga),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, allowGroupsSagas),
    takeLatest(configActions.GET_INITIAL_USERDATA, requestAllPersonalData),
    takeLatest(pdataActions.GET_USERDATA_SUCCESS.type, requestCredentials),
    takeLatest(pdataActions.postUserdata.type, postPersonalDataSaga),
    takeLatest(updateNamesFromSkatteverketActions.UPDATE_NAMES_FROM_SKATTEVERKET, updateNamesFromSkatteverketSaga),
    takeLatest(openidActions.SHOW_OIDC_SELEG_MODAL, sagasOpenid.checkNINAndShowSelegModal),
    takeLatest(openidActions.POST_OIDC_PROOFING_PROOFING, sagasOpenid.requestOpenidQRcode),
    takeLatest(lmpActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING, saveLMPNinData),
    takeLatest(openidFrejaActions.POST_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.initializeOpenidFrejaData),
    takeLatest(openidFrejaActions.GET_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.requestOpenidFrejaData),
    takeLatest(openidFrejaActions.SHOW_OIDC_FREJA_MODAL, sagasOpenidFreja.checkNINAndShowFrejaModal),
    takeLatest(openidFrejaActions.HIDE_OIDC_FREJA_MODAL, sagasOpenidFreja.closeFrejaModal),
    takeLatest(emailActions.POST_EMAIL, saveEmail),
    takeLatest(emailActions.START_RESEND_EMAIL_CODE, requestResendEmailCode),
    takeLatest(emailActions.START_VERIFY, requestVerifyEmail),
    takeLatest(emailActions.POST_EMAIL_REMOVE, requestRemoveEmail),
    takeLatest(emailActions.POST_EMAIL_PRIMARY, requestMakePrimaryEmail),
    takeLatest(mobileActions.POST_MOBILE, sagasMobile.saveMobile),
    takeLatest(mobileActions.POST_MOBILE_REMOVE, sagasMobile.requestRemoveMobile),
    takeLatest(mobileActions.POST_MOBILE_PRIMARY, sagasMobile.requestMakePrimaryMobile),
    takeLatest(mobileActions.START_RESEND_MOBILE_CODE, sagasMobile.requestResendMobileCode),
    takeLatest(mobileActions.START_VERIFY, sagasMobile.requestVerifyMobile),
    takeLatest(securityActions.initiatePasswordChange.type, requestPasswordChange),
    takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeLatest(letterProofingSlice.actions.postLetterProofingVerificationCode, sendLetterCode),
    takeLatest(ninActions.postNin.type, postNin),
    takeEvery(ninActions.POST_NIN_SUCCESS, requestNins),
    takeLatest(ninsSlice.actions.startRemove.type, requestRemoveNin),
    takeEvery(ninActions.POST_NIN_REMOVE_SUCCESS, requestNins),
    takeEvery(letterProofingSlice.actions.stopLetterVerification, requestAllPersonalData),
    takeEvery(letterProofingSlice.actions.postLetterProofingSuccess, requestAllPersonalData),
    takeEvery(letterProofingSlice.actions.postLetterProofingCodeSuccess, requestAllPersonalData),
    takeEvery(lmpActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS, requestAllPersonalData),
    takeEvery(lmpActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL, requestNins),
    takeEvery(openidActions.POST_OIDC_PROOFING_PROOFING_SUCCESS, requestNins),
    takeEvery(openidFrejaActions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS, requestNins),
    takeEvery(headerActions.POST_LOGOUT, requestLogout),
    takeLatest(securityActions.START_WEBAUTHN_REGISTRATION, beginRegisterWebauthn),
    takeLatest(securityActions.POST_WEBAUTHN_BEGIN_SUCCESS, registerWebauthn),
    takeLatest(securityActions.POST_WEBAUTHN_REMOVE, removeWebauthnToken),
    takeLatest(securityActions.POST_WEBAUTHN_VERIFY, verifyWebauthnToken),
    takeEvery(accountLinkingActions.POST_ORCID_REMOVE, requestRemoveOrcid),
    takeEvery(accountLinkingActions.POST_ORCID_REMOVE_SUCCESS, requestOrcid),
    takeEvery(accountLinkingActions.GET_ORCID_CONNECT, requestConnectOrcid),
  ];
}

export default rootSaga;
