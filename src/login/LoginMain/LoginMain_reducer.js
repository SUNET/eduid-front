import * as actions from "login/LoginMain/LoginMain_actions";
import * as chpass_actions from "actions/ChangePassword";


const loginData = {
  is_app_loaded: false,
  csrf_token: "",
  //is_fetching: false,
  error: false,
  DEBUG: true,
  available_languages: {},
  success_title: '',
  success_body: '',
};

//const fetchingActions = [
//];

//const unFetchingActions = [];

const loginReducer = (state = loginData, action) => {
  switch (action.type) {
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
    //case actions.APP_FETCHING:
      //return {
        //...state,
        //is_fetching: true
      //};
    case actions.GET_LOGIN_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        // is_fetching: false
      };
    case actions.POST_CODE_SUCCESS:
      // the payload in this action will come directly from the backend,
      // dispatched (put) in the saga getConfigFromCode
      return {
        ...state,
        ...action.payload,
        error: false,
      };
    case actions.POST_CODE_FAIL:
      return {
        ...state,
        error: true,
      };
    case chpass_actions.SET_ZXCVBN:
      return {
        ...state,
        zxcvbn_module: action.payload.module
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

export default loginReducer;
