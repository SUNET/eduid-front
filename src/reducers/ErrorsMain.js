import * as actions from "actions/ErrorsMain";

const configData = {
  is_app_loaded: false,
  available_languages: []
};

let signupReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_app_loaded: true,
      };
    case actions.UPDATE_AVAILABLE_LANGUAGE:
      return {
        is_app_loaded: true,
        available_languages: [
          ["en", "English"], 
          ["sv", "Svenska"]
        ],
      };
    default:
      return state;
  }
};

export default signupReducer;
