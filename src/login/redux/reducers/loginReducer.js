import * as onLoadActions from "../actions/addDataToStoreActions";
import * as actions from "../actions/postRefLoginActions";

const loginData = {
  ref: null,
  next_page: null,
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case onLoadActions.ADD_LOGIN_REF_TO_STORE:
      return {
        ...state,
        ref: action.payload.ref,
      };
    case actions.POST_IDP_NEXT_SUCCESS:
      const page = "USERNAMEPASSWORD";
      return {
        ...state,
        next_page: page,
      };
    default:
      return state;
  }
};

export default loginReducer;
