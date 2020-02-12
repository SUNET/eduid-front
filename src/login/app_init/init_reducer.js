import * as actions from "./init_actions";

const initData = {
  csrf_token: "",
  error: false,
  DEBUG: true,
  available_languages: {}
};

let initReducer = (state = initData, action) => {
  switch (action.type) {
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload
      };
    case actions.GET_LOGIN_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default initReducer;
