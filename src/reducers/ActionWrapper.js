import * as actions from "actions/ActionWrapper";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  csrf_token: "",
  is_app_loaded: false,
  redirect: "/",
  //is_fetching: false,
  error: false,
  available_languages: {}
};

let actionWrapperReducer = (state = configData, action) => {
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
