import * as getActions from "../actions/getResetPasswordActions";
import * as postActions from "../actions/postResetPasswordActions";

const data = {
    email: "",
    csrf_token: "",
    email_code: ""
};

let resetPasswordReducer = (state = data, action) => {
  switch (action.type) {
    case getActions.GET_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
       ...action.payload
      };
    case postActions.POST_RESET_PASSWORD:
      return {
        ...state,
        ...action.payload
      };
    case postActions.POST_RESET_PASSWORD_VERIFY_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
  
};

export default resetPasswordReducer;
