import * as actions from "./App_actions";


const loginData = {
  is_app_loaded: false,
  csrf_token: "",
  //is_fetching: false,
  error: false,
  DEBUG: true,
  available_languages: {},
};

//const fetchingActions = [
//];

//const unFetchingActions = [];

let loginReducer = (state = loginData, action) => {
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
