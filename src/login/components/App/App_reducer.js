import * as actions from "./App_actions";

const appData = {
  is_loaded: false
};

let appReducer = (state = appData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_loaded: true
      };
    default:
      return state;
  }
};

export default appReducer;
