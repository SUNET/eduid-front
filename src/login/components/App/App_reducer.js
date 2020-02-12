import * as actions from "./App_actions";

const appData = {
  is_loaded: false
};

//const fetchingActions = [
//];

//const unFetchingActions = [];

let appReducer = (state = appData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_loaded: true
      };
    // case actions.NEW_CSRF_TOKEN:
    //   return {
    //     ...state,
    //     ...action.payload
    //   };
    // //case actions.APP_FETCHING:
    //   //return {
    //     //...state,
    //     //is_fetching: true
    //   //};
    // case actions.GET_LOGIN_CONFIG_SUCCESS:
    //   return {
    //     ...state,
    //     ...action.payload,
    //     // is_fetching: false
    // };
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

export default appReducer;
