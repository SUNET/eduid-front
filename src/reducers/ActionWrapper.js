
import * as actions from "actions/ActionWrapper";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    resize_timeout: 0,
    window_size: actions.getWindowSize(),
    csrf_token: '',
    is_app_loaded: false,
    redirect: '/',
    is_fetching: false,
    error: false,
    available_languages: {}
};

let actionWrapperReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.APP_LOADING:
      return {
          ...state, 
          is_app_loaded: false
      };
    case actions.APP_LOADED:
      return {
          ...state, 
          is_app_loaded: true
      };
    case actions.APP_FETCHING:
      return {
          ...state, 
          is_fetching: true
      };
    case actions.RESIZE_TIMEOUT:
      return {
          ...state,
          ...action.payload
      };
    case actions.RESIZE_WINDOW:
      return {
          ...state,
          ...action.payload
      };
    case actions.NEW_CSRF_TOKEN:
      return {
          ...state,
          ...action.payload
      };
    case actions.REDIRECT:
      return {
          ...state,
          redirect: action.payload.path
      };
    case actions.GET_ACTIONS_CONFIG_SUCCESS:
      return {
          ...state,
          ...action.payload
      };
    default:
      return state;
  }
};

export default actionWrapperReducer;

