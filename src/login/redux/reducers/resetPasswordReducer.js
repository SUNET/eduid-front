import * as resetPasswordActions from "../actions/resetPasswordActions";

import * as getWebauthnActions from "../actions/getWebauthnAssertionActions";

const data = {
    email_address: "",
    email_code: "",
    phone: {},
    webauthn_assertion: null,
    selected_option: null,
    new_password: null
};

let resetPasswordReducer = (state = data, action) => {
  switch (action.type) {
    case resetPasswordActions.POST_RESET_PASSWORD:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.SAVE_RESET_PASSWORD_VERIFY_EMAIL_CODE:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.POST_RESET_PASSWORD_VERIFY_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.POST_RESET_PASSWORD_VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.POST_RESET_PASSWORD_EXTRA_SECURITY_PHONE:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.SAVE_PHONE_CODE:
      return {
        ...state,
        phone: {
          ...state.phone,
          ...action.payload
        }
      };
    case getWebauthnActions.GET_WEBAUTHN_ASSERTION:
      return {
        ...state,
        ...action.payload
      };
    case getWebauthnActions.GET_WEBAUTHN_ASSERTION_FAIL:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.SELECT_EXTRA_SECURITY_OPTION:
      return {
        ...state,
        ...action.payload
      };
    case resetPasswordActions.STORE_RESET_PASSWORD_NEW_PASSWORD:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
