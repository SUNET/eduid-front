import * as actions from "../actions/errorsMainActions";

const configData = {
  is_app_loaded: false,
  available_languages: [],
  static_faq_url: ""
};

let signupReducer = (state = configData, action) => {
  switch (action.type) {
    case actions.APP_LOADED:
      return {
        ...state,
        is_app_loaded: true,
      };
    case actions.UPDATE_CONFIG_DATA:
      return {
        is_app_loaded: true,
        available_languages: [
          ["en", "English"], 
          ["sv", "Svenska"]
        ],
        static_faq_url: "https://html.eduid.docker/faq.html"
      };
    default:
      return state;
  }
};

export default signupReducer;
