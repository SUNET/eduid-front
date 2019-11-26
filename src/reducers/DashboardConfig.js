import * as actions from "actions/DashboardConfig";
import * as pdataActions from "actions/PersonalData";
import * as oidcActions from "actions/OpenidConnect";
import * as lmobileActions from "actions/LookupMobileProofing";
import * as ninsActions from "actions/Nins";
import * as letterActions from "actions/LetterProofing";
import * as secActions from "actions/Security";
import * as orcidActions from "actions/AccountLinking";
import * as phoneActions from "actions/Mobile";
import * as chpassActions from "actions/ChangePassword";
import * as frejaActions from "actions/OpenidConnectFreja";
import * as emailsActions from "actions/Emails";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  window_size: actions.getWindowSize(),
  show_sidebar: true,
  is_configured: false,
  //is_fetching: false,
  failed: false,
  is_spa: false,
  is_app_loaded: false,
  AVAILABLE_LANGUAGES: [],
  DEBUG: true
};

//const fetchingActions = [
  //actions.GET_JSCONFIG_CONFIG,
  //pdataActions.GET_ALL_USERDATA,
  //pdataActions.POST_USERDATA,
  //oidcActions.POST_OIDC_PROOFING_PROOFING,
  //lmobileActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING,
  //ninsActions.GET_NINS,
  //ninsActions.POST_NIN_REMOVE,
  //letterActions.GET_LETTER_PROOFING_PROOFING,
  //letterActions.POST_LETTER_PROOFING_PROOFING,
  //letterActions.POST_LETTER_PROOFING_CODE,
  //secActions.GET_CREDENTIALS,
  //secActions.GET_CHANGE_PASSWORD,
  //secActions.POST_DELETE_ACCOUNT,
  //secActions.GET_DELETE_ACCOUNT,
  //secActions.START_WEBAUTHN_REGISTRATION,
  //secActions.POST_WEBAUTHN_REMOVE,
  //secActions.POST_WEBAUTHN_VERIFY,
  //orcidActions.GET_ORCID,
  //orcidActions.GET_ORCID_CONNECT,
  //orcidActions.POST_ORCID_REMOVE,
  //phoneActions.POST_MOBILE,
  //phoneActions.START_CONFIRMATION,
  //phoneActions.START_RESEND_MOBILE_CODE,
  //phoneActions.START_VERIFY,
  //phoneActions.POST_MOBILE_REMOVE,
  //phoneActions.POST_MOBILE_PRIMARY,
  //chpassActions.GET_SUGGESTED_PASSWORD,
  //chpassActions.START_PASSWORD_CHANGE,
  //frejaActions.GET_OIDC_PROOFING_FREJA_PROOFING,
  //frejaActions.POST_OIDC_PROOFING_FREJA_PROOFING,
  //emailsActions.POST_EMAIL,
  //emailsActions.START_CONFIRMATION,
  //emailsActions.START_RESEND_EMAIL_CODE,
  //emailsActions.START_VERIFY,
  //emailsActions.POST_EMAIL_REMOVE,
  //emailsActions.POST_EMAIL_PRIMARY
//];

//const unFetchingActions = [
  //secActions.STOP_CHANGE_PASSWORD,
  //secActions.START_ASK_WEBAUTHN_DESCRIPTION,
  //secActions.STOP_ASK_WEBAUTHN_DESCRIPTION,
  //phoneActions.STOP_CONFIRMATION,
  //chpassActions.PASSWORD_NOT_READY,
  //emailsActions.STOP_CONFIRMATION
//];

const urls_with_no_sidebar = ["chpass"];

let configReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.GET_JSCONFIG_CONFIG:
      return {
        ...state,
        is_configured: false,
        failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_configured: true,
        failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_FAIL:
      return {
        ...state,
        is_configured: false,
        failed: true
      };
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload
      };
    case actions.RESIZE_WINDOW:
      return {
        ...state,
        ...action.payload
      };
    case actions.CONFIG_SPA:
      return {
        ...state,
        is_spa: true
      };
    case pdataActions.GET_USERDATA_SUCCESS:
      return {
        ...state,
        is_app_loaded: true
      };
    case "@@router/LOCATION_CHANGE":
      let show_sidebar = true;
      if (
        urls_with_no_sidebar.filter(v => action.payload.pathname.endsWith(v))
          .length > 0
      ) {
        show_sidebar = false;
      }
      return {
        ...state,
        show_sidebar: show_sidebar
      };
    default:
      //if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FAIL")) {
        //return {
          //...state,
          //is_fetching: false
        //};
      //} else if (fetchingActions.includes(action.type)) {
        //return {
          //...state,
          //is_fetching: true
        //};
      //} else if (unFetchingActions.includes(action.type)) {
        //return {
          //...state,
          //is_fetching: false
        //};
      //}
      return state;
  }
};

export default configReducer;
