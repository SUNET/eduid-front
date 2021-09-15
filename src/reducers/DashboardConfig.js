import * as actions from "actions/DashboardConfig";
import * as loadingDataActions from "../login/redux/actions/loadingDataActions";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  show_sidebar: true,
  is_configured: false,
  loading_data: false,
  //is_fetching: false,

  is_app_loaded: false,
  available_languages: [],
  debug: true,
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
  //emailsActions.STOP_CONFIRMATION
//];

const urls_with_no_sidebar = ["chpass"];

let configReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_fetching: false,
        is_app_loaded: true,
      };
    case actions.GET_JSCONFIG_CONFIG:
      return {
        ...state,
        is_configured: false,
      };
    case actions.GET_JSCONFIG_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_configured: true,
      };
    case actions.GET_JSCONFIG_CONFIG_FAIL:
      return {
        ...state,
        is_configured: false,
      };
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case "@@router/LOCATION_CHANGE": {
      let show_sidebar = true;
      if (
        urls_with_no_sidebar.filter((v) => action.payload.pathname.endsWith(v))
          .length > 0
      ) {
        show_sidebar = false;
      }
      return {
        ...state,
        show_sidebar: show_sidebar,
      };
    }
    case loadingDataActions.LOAD_DATA_REQUEST:
      return {
        ...state,
        loading_data: true,
      };
    case loadingDataActions.LOAD_DATA_COMPLETE:
      return {
        ...state,
        loading_data: false,
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
