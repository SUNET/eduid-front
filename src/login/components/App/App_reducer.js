import * as actions from "./App_actions";
import * as loadingDataActions from "../../redux/actions/loadingDataActions";

const appData = {
  is_loaded: false,
  loading_data: false,
};

let appReducer = (state = appData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_loaded: true,
      };
    case loadingDataActions.LOAD_DATA_REQUEST:
      return {
        ...state,
        loading_data: true,
      };
    case loadingDataActions.LOAD_DATA_COMPLETE:
      return {
        ...state,
        loading_data: false,
      };
    default:
      return state;
  }
};

export default appReducer;
