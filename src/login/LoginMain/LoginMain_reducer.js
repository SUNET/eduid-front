import * as actions from "login/LoginMain/LoginMain_actions";

// see the config params in eduid-developer/etcd/conf.yaml
const loginData = {
  is_app_loaded: false,
  reset_passwd_url: "",
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
    case actions.APP_LOADED:
      return {
        ...state,
        is_app_loaded: true
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
