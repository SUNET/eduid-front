import * as actions from "actions/ActionMain";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  csrf_token: "",
  is_app_loaded: false,
  redirect: "/",
  //is_fetching: false,
  available_languages: {}
};

let actionMainReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_app_loaded: true
      };
    case actions.GET_ACTIONS_CONFIG_SUCCESS:
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
    default:
      return state;
  }
};

export default actionMainReducer;