import * as actions from "./init_actions";

const initData = {
  csrf_token: "",
  error: false,
  debug: true,
  available_languages: [],
  next_url: null,
};

let initReducer = (state = initData, action) => {
  switch (action.type) {
    case actions.GET_JSCONFIG_LOGIN_CONFIG_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default initReducer;
