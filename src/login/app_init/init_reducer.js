import * as actions from "./init_actions";

const initData = {
  csrf_token: "",
  error: false,
  debug: true,
  available_languages: [],
  extra_security: {}
};

let initReducer = (state = initData, action) => {
  switch (action.type) {
    case actions.NEW_CSRF_TOKEN:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default initReducer;
