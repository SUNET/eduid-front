import { takeLatest, takeEvery, select } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import * as configActions from "actions/DashboardConfig";
import * as pdataActions from "actions/PersonalData";
import * as emailActions from "actions/Emails";
import * as mobileActions from "actions/Mobile";
import * as openidActions from "actions/OpenidConnect";
import * as securityActions from "actions/Security";
import * as accountLinkingActions from "actions/AccountLinking";
import * as pwActions from "actions/ChangePassword";
import * as ninActions from "actions/Nins";
import * as openidFrejaActions from "actions/OpenidConnectFreja";
import * as letterActions from "actions/LetterProofing";
import * as lmpActions from "actions/LookupMobileProofing";
import * as headerActions from "actions/Header";
import * as updateNamesFromSkatteverketActions from "./login/redux/actions/updateNamesFromSkatteverketActions";

import { requestAllPersonalData } from "sagas/PersonalData";
import {
  saveEmail,
  requestResendEmailCode,
  requestVerifyEmail,
  requestRemoveEmail,
  requestMakePrimaryEmail,
} from "sagas/Emails";
import * as sagasMobile from "sagas/Mobile";
import * as sagasOpenidFreja from "sagas/OpenidConnectFreja";
import * as sagasOpenid from "sagas/OpenidConnect";
import { requestConfig } from "sagas/DashboardConfig";
import { requestRemoveOrcid, requestOrcid, requestConnectOrcid } from "sagas/AccountLinking";
import {
  requestCredentials,
  requestPasswordChange,
  postDeleteAccount,
  beginRegisterWebauthn,
  registerWebauthn,
  removeWebauthnToken,
  verifyWebauthnToken,
} from "sagas/Security";
import { requestSuggestedPassword, postPasswordChange } from "sagas/ChangePassword";
import { requestNins, requestRemoveNin, postNin } from "sagas/Nins";
import { sendLetterProofing, sendGetLetterProofing, sendLetterCode } from "sagas/LetterProofing";
import { requestLogout } from "sagas/Header";
import { saveLMPNinData } from "sagas/LookupMobileProofing";
import groupsSagas from "./login/redux/sagas/rootSaga/groupManagementSagas";
import { updateNamesFromSkatteverketSaga } from "./login/redux/sagas/personalData/updateNamesFromSkatteverketSaga";
import { postPersonalDataSaga } from "./login/redux/sagas/personalData/postPersonalDataSaga";
import ninsSlice from "reducers/Nins";

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
    takeLatest(pdataActions.GET_USERDATA_SUCCESS.type, requestSuggestedPassword),
    takeLatest(pdataActions.GET_USERDATA_SUCCESS.type, sendGetLetterProofing),
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
    takeLatest(securityActions.GET_CHANGE_PASSWORD, requestPasswordChange),
    takeLatest(pwActions.POST_PASSWORD_CHANGE, postPasswordChange),
    takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeLatest(letterActions.POST_LETTER_PROOFING_PROOFING, sendLetterProofing),
    takeLatest(letterActions.GET_LETTER_PROOFING_PROOFING, sendGetLetterProofing),
    takeLatest(letterActions.POST_LETTER_PROOFING_CODE, sendLetterCode),
    takeLatest(ninActions.postNin.type, postNin),
    takeEvery(ninActions.POST_NIN_SUCCESS, requestNins),
    takeLatest(ninsSlice.actions.startRemove.type, requestRemoveNin),
    takeEvery(ninActions.POST_NIN_REMOVE_SUCCESS, requestNins),
    takeEvery(letterActions.STOP_LETTER_VERIFICATION, requestAllPersonalData),
    takeEvery(letterActions.POST_LETTER_PROOFING_PROOFING_SUCCESS, requestAllPersonalData),
    takeEvery(letterActions.POST_LETTER_PROOFING_CODE_SUCCESS, requestAllPersonalData),
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
