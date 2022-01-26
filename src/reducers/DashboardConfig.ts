import * as actions from "actions/DashboardConfig";
import * as loadingDataActions from "../login/redux/actions/loadingDataActions";

interface commonConfig {
  debug: boolean;
  environment: "dev" | "staging" | "production";
}

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  is_configured: false,
  loading_data: false,
  //is_fetching: false,

  is_app_loaded: false,
  available_languages: [],
  debug: true,
};

let configReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_fetching: false,
        is_app_loaded: true,
      };
    case actions.GET_JSCONFIG_CONFIG:
      return {
        ...state,
        is_configured: false,
      };
    case actions.GET_JSCONFIG_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_configured: true,
      };
    case actions.GET_JSCONFIG_CONFIG_FAIL:
      return {
        ...state,
        is_configured: false,
      };
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload,
      };
    case loadingDataActions.loadingData.toString():
      return {
        ...state,
        loading_data: true,
      };
    case loadingDataActions.loadingDataComplete.toString():
      return {
        ...state,
        loading_data: false,
      };
    default:
      return state;
  }
};

export default configReducer;
