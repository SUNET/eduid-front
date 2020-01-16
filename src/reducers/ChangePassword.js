import * as actions from "actions/ChangePassword";

const chpass = {
  message: "",
  suggested_password: "",
  old_password: "",
  new_password: "",
  zxcvbn_module: undefined
};

let chpassReducer = (state = chpass, action) => {
  switch (action.type) {
    case actions.GET_SUGGESTED_PASSWORD:
      return {
        ...state
      };
    case actions.GET_SUGGESTED_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.GET_SUGGESTED_PASSWORD_FAIL:
      return {
        ...state,
        message: action.payload.message,
      };
    case actions.POST_PASSWORD_CHANGE:
      return {
        ...state,
        old_password: action.payload.old,
        new_password: action.payload.next
      };
    case actions.POST_SECURITY_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.SET_ZXCVBN:
      return {
        ...state,
        zxcvbn_module: action.payload.module
      };
    default:
      return state;
  }
};
export default chpassReducer;
