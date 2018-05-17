
import * as actions from "actions/Main";
import * as captchaActions from "actions/Captcha";
import * as verifiedActions from "actions/CodeVerified";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    window_size: actions.getWindowSize(),
    csrf_token: '',
    recaptcha_public_key: '',
    captcha: '',
    code: '',
    tou: '',
    is_app_loaded: false,
    is_fetching: false,
    error: false,
    DEBUG: true
};

let mainReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
          ...state, 
          is_app_loaded: true
      };
    case actions.GET_CODE_STATUS:
      return {
          ...state, 
          ...action.payload,
          is_fetching: true
      };
    case actions.RESIZE_WINDOW:
      return {
          ...state,
          ...action.payload
      };
    case actions.GET_SIGNUP_CONFIG_SUCCESS:
      return {
          ...state,
          ...action.payload
      };
    case actions.NEW_CSRF_TOKEN:
      return {
          ...state,
          ...action.payload
      };
    case captchaActions.POST_SIGNUP_TRYCAPTCHA:
      return {
          ...state, 
          is_fetching: true
      };
    case captchaActions.POST_SIGNUP_TRYCAPTCHA_SUCCESS:
      return {
          ...state,
          is_fetching: false,
          error: false
      };
    case captchaActions.POST_SIGNUP_TRYCAPTCHA_FAIL:
      return {
          ...state,
          is_fetching: false,
          error: true
      };
    case verifiedActions.GET_SIGNUP_VERIFY_LINK_SUCCESS:
      return {
          ...state,
          is_fetching: false,
          error: false
      };
    case verifiedActions.GET_SIGNUP_VERIFY_LINK_FAIL:
      return {
          ...state,
          is_fetching: false,
          error: true
      };
    default:
      return state;
  }
};

export default mainReducer;
