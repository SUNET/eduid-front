import * as actions from "login/Resetting/Resetting_actions";


const resettingData = {
  email_code: "",
};

let resettingReducer = (state = resettingData, action) => {
  switch (action.type) {
    case actions.POST_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default resettingReducer;
