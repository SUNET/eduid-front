
import * as actions from "actions/DashboardConfig";
import * as pdataActions from "actions/PersonalData";
import * as oidcActions from "actions/OpenidConnect";
import * as lmobileActions from "actions/LookupMobileProofing";
import * as ninsActions from "actions/Nins";
import * as letterActions from "actions/LetterProofing";
import * as secActions from "actions/Security";
import * as orcidActions from "actions/Orcid";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    window_size: actions.getWindowSize(),
    show_sidebar: true,
    is_configured: false,
    is_fetching: false,
    failed: false,
    is_spa: false,
    is_app_loaded: false,
    AVAILABLE_LANGUAGES: [],
    DEBUG: true
};

const fetchingActions = [
    pdataActions.GET_ALL_USERDATA,
    pdataActions.POST_USERDATA,
    oidcActions.POST_OIDC_PROOFING_PROOFING,
    lmobileActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING,
    ninsActions.GET_NINS,
    ninsActions.POST_NIN_REMOVE,
    letterActions.GET_LETTER_PROOFING_PROOFING,
    letterActions.POST_LETTER_PROOFING_PROOFING,
    letterActions.POST_LETTER_PROOFING_CODE,
    secActions.GET_CREDENTIALS,
    secActions.GET_CHANGE_PASSWORD,
    secActions.POST_DELETE_ACCOUNT,
    secActions.GET_DELETE_ACCOUNT,
    secActions.START_U2F_REGISTRATION,
    secActions.GET_U2F_ENROLL,
    secActions.GET_U2F_REGISTER,
    secActions.POST_U2F_BIND,
    secActions.POST_U2F_REMOVE,
    secActions.POST_U2F_VERIFY,
    orcidActions.GET_ORCID,
    orcidActions.GET_PERSONAL_DATA_ORCID,
    orcidActions.GET_ORCID_CONNECT,
    orcidActions.POST_ORCID_REMOVE,
];

const unFetchingActions = [
    pdataActions.GET_USERDATA_SUCCESS,
    pdataActions.GET_ALL_USERDATA_FAIL,
    pdataActions.POST_USERDATA_SUCCESS,
    pdataActions.POST_USERDATA_FAIL,
    oidcActions.POST_OIDC_PROOFING_PROOFING_SUCCESS,
    oidcActions.POST_OIDC_PROOFING_PROOFING_FAIL,
    lmobileActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS,
    lmobileActions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL,
    ninsActions.GET_NINS_SUCCESS,
    ninsActions.GET_NINS_FAIL,
    ninsActions.POST_NIN_REMOVE_SUCCESS,
    ninsActions.POST_NIN_REMOVE_FAIL,
    letterActions.GET_LETTER_PROOFING_PROOFING_SUCCESS,
    letterActions.GET_LETTER_PROOFING_PROOFING_FAIL,
    letterActions.POST_LETTER_PROOFING_PROOFING_SUCCESS,
    letterActions.POST_LETTER_PROOFING_PROOFING_FAIL,
    letterActions.POST_LETTER_PROOFING_CODE_SUCCESS,
    letterActions.POST_LETTER_PROOFING_CODE_FAIL,
    secActions.GET_CREDENTIALS_SUCCESS,
    secActions.GET_CREDENTIALS_FAIL,
    secActions.STOP_CHANGE_PASSWORD,
    secActions.GET_CHANGE_PASSWORD_FAIL,
    secActions.POST_DELETE_ACCOUNT_SUCCESS,
    secActions.POST_DELETE_ACCOUNT_FAIL,
    secActions.GET_DELETE_ACCOUNT_SUCCESS,
    secActions.GET_DELETE_ACCOUNT_FAIL,
    secActions.STOP_U2F_REGISTRATION,
    secActions.START_ASK_U2F_DESCRIPTION,
    secActions.STOP_ASK_U2F_DESCRIPTION,
    secActions.GET_U2F_ENROLL_SUCCESS,
    secActions.GET_U2F_ENROLL_FAIL,
    secActions.GET_U2F_REGISTER_SUCCESS,
    secActions.GET_U2F_REGISTER_FAIL,
    secActions.POST_U2F_BIND_SUCCESS,
    secActions.POST_U2F_BIND_FAIL,
    secActions.POST_U2F_REMOVE_SUCCESS,
    secActions.POST_U2F_REMOVE_FAIL,
    secActions.POST_U2F_VERIFY_SUCCESS,
    secActions.POST_U2F_VERIFY_FAIL,
    orcidActions.GET_ORCID_SUCCESS,
    orcidActions.GET_ORCID_FAIL,
    orcidActions.GET_PERSONAL_DATA_ORCID_SUCCESS,
    orcidActions.GET_PERSONAL_DATA_ORCID_FAIL,
    orcidActions.GET_ORCID_CONNECT_SUCCESS,
    orcidActions.GET_ORCID_CONNECT_FAIL,
    orcidActions.POST_ORCID_REMOVE_SUCCESS,
    orcidActions.POST_ORCID_REMOVE_FAIL,
];

const urls_with_no_sidebar = [
    'chpass'
];


let configReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.GET_JSCONFIG_CONFIG:
      return {
          ...state, 
          is_configured: false,
          is_fetching: true,
          failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_SUCCESS:
      return {
          ...state, 
          ...action.payload,
          is_configured: true,
          is_fetching: false,
          failed: false
      };
    case actions.GET_JSCONFIG_CONFIG_FAIL:
      return {
          ...state,
          is_configured: false,
          is_fetching: false,
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
      if (urls_with_no_sidebar.filter(v => (action.payload.pathname.endsWith(v))).length > 0) {show_sidebar = false}
      return {
          ...state,
          show_sidebar: show_sidebar
      };
    default:
      if (fetchingActions.includes(action.type)) {
	  return {
	      ...state,
	      is_fetching: true
	  };
      } else if (unFetchingActions.includes(action.type)) {
	  return {
	      ...state,
	      is_fetching: false
	  };
      }
      return state;
  }
};

export default configReducer;
