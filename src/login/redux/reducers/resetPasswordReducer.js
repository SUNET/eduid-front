import * as postActions from "../actions/postResetPasswordActions";

const data = {
    email_address: "",
    email_code: "",
    phone_index: null,
    show_modal: false
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
    case postActions.SHOW_MODAL:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
