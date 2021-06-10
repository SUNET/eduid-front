import * as postActions from "../actions/postResetPasswordActions";

const data = {
  email: ""
};

let resetPasswordReducer = (state = data, action) => {
  switch (action.type) {
    case postActions.POST_RESET_PASSWORD:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default resetPasswordReducer;
