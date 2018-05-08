
import * as actions from "actions/Main";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    window_size: actions.getWindowSize(),
    csrf_token: '',
    email: '',
    recaptcha_public_key: '',
    captcha: '',
    code: '',
    is_app_loaded: false,
    is_fetching: false,
    code: '',
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
          ...action.payload
      };
    case actions.RESIZE_WINDOW:
      return {
          ...state,
          ...action.payload
      };
    case actions.ADD_EMAIL:
      return {
          ...state,
          ...action.payload
      };
    case actions.GET_SIGNUP_CONFIG_SUCCESS:
      return {
          ...state,
          ...action.payload
      };
    default:
      return state;
  }
};

export default mainReducer;
