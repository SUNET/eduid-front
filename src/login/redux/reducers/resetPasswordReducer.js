import * as actions from "../actions/resetPasswordActions";

const data = {
    email: "",
    csrf_token: ""
};

let resetPasswordReducer = (state = data, action) => {
  switch (action.type) {
    case actions.GET_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
       ...action.payload
      };
      case actions.POST_RESET_PASSWORD:
        return {
          ...state,
         ...action.payload
        };
    default:
      return state;
  }
  
};

export default resetPasswordReducer;
