import * as actions from "./init_actions";

const initData = {
  csrf_token: "",
  error: false,
  DEBUG: true,
  AVAILABLE_LANGUAGES: []
};

let initReducer = (state = initData, action) => {
  switch (action.type) {
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload
      };
    case actions.GET_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.FROM_BACKEND_EMAIL_LINK_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: false
      };
    default:
      return state;
  }
};

export default initReducer;
