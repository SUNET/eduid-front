import * as actions from "actions/DashboardConfig";
import * as loadingDataActions from "../login/redux/actions/loadingDataActions";

// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
  show_sidebar: true,
  is_configured: false,
  loading_data: false,
  //is_fetching: false,

  is_app_loaded: false,
  available_languages: [],
  debug: true,
};

const urls_with_no_sidebar = ["chpass"];

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
    case "@@router/LOCATION_CHANGE": {
      let show_sidebar = true;
      if (urls_with_no_sidebar.filter((v) => action.payload.pathname.endsWith(v)).length > 0) {
        show_sidebar = false;
      }
      return {
        ...state,
        show_sidebar: show_sidebar,
      };
    }
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
