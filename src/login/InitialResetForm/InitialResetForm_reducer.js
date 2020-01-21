import * as actions from "login/InitialResetForm/InitialResetForm_actions";


const resetData = {
  email: "",
};

let initResetReducer = (state = resetData, action) => {
  switch (action.type) {
    case actions.DEAL_WITH_EMAIL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default initResetReducer;
