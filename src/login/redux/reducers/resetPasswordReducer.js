import * as postActions from "../actions/postResetPasswordActions";

const data = {
    email_address: "",
    email_code: "",
    phone: {},
    phone_code: "",
    selected_option: null,

};

let resetPasswordReducer = (state = data, action) => {
  switch (action.type) {
    case postActions.POST_RESET_PASSWORD:
      return {
        ...state,
        ...action.payload
      };
    case postActions.SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE:
      return {
        ...state,
        ...action.payload
      };
    case postActions.POST_RESET_PASSWORD_VERIFY_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case postActions.POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case postActions.POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE:
      return {
        ...state,
        ...action.payload
      };
    case postActions.SAVE_PHONE_CODE:
      return {
        ...state,
        ...action.payload
      };
    case postActions.SELECT_EXTRA_SECURITY_OPTION:
        return {
          ...state,
          ...action.payload
        };
        case postActions.ADD_TOKEN_ASSERTION:
          return {
            ...state,
            ...action.payload
          };
        
    default:
      return state;
  }
};

export default resetPasswordReducer;
