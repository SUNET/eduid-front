import * as actions from "../actions/addDataToStoreActions";

const loginData = {
  ref: null,
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case actions.ADD_LOGIN_REF_TO_STORE:
      return {
        ...state,
        ref: action.payload.ref,
      };
    default:
      return state;
  }
};

export default loginReducer;
