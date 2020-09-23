import * as actions from "actions/SignupMain";
import * as captchaActions from "actions/Captcha";
import * as verifiedActions from "actions/CodeVerified";
import * as resendActions from "actions/ResendCode";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  dashboard_url: "",
  reset_passwd_url: "",
  csrf_token: "",
  recaptcha_public_key: "",
  captcha: "",
  code: "",
  tou: "",
  is_app_loaded: false,
  //is_fetching: false,
  debug: true,
  available_languages: [],
  eidas_url: "",
  mfa_authn_idp: ""
};

//const fetchingActions = [
  //actions.GET_SIGNUP_CONFIG,
  //actions.APP_LOADING,
  //actions.APP_FETCHING,
  //verifiedActions.GET_CODE_STATUS,
  //captchaActions.POST_SIGNUP_TRYCAPTCHA,
  //resendActions.POST_SIGNUP_RESEND_VERIFICATION,
//];

//const unFetchingActions = [
  //actions.APP_LOADED,
//];

let signupReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_app_loaded: true
      };
    case verifiedActions.GET_CODE_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.GET_SIGNUP_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload
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

export default signupReducer;
