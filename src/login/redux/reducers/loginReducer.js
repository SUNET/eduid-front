import * as actions from "../actions/addDataToStoreActions";

const loginData = {
  email: "",
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL_ADDRESS_TO_STORE:
      // console.log("email address:", action.payload.email);
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default loginReducer;
