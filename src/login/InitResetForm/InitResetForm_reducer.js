import * as actions from "login/InitResetForm/InitResetForm_actions";


const resetData = {
  email: "",
  email_sent: false,
};

let initResetFormReducer = (state = resetData, action) => {
  switch (action.type) {
    case actions.DEAL_WITH_EMAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actions.POST_RESET_PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        email_sent: true,
      };
    default:
      return state;
  }
};

export default initResetFormReducer;
