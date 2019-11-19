import * as actions from "actions/LoginMain";

// see the config params in eduid-developer/etcd/conf.yaml
const loginData = {
  reset_passwd_url: "",
  resize_timeout: 0,
  window_size: actions.getWindowSize(),
  csrf_token: "",
  is_fetching: false,
  error: false,
  DEBUG: true,
  available_languages: {},
};

const fetchingActions = [];

const unFetchingActions = [];

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
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
    default:
      if (action.type.endsWith("_SUCCESS") || action.type.endsWith("_FAIL")) {
        return {
          ...state,
          is_fetching: false
        };
      } else if (fetchingActions.includes(action.type)) {
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

export default loginReducer;
