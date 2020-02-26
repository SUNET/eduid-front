import * as actions from "./EmailLinkSent_actions";

const emailLinkSentData = {
  email_code: "",
};

let emailLinkSentReducer = (state = emailLinkSentData, action) => {
  switch (action.type) {
    case actions.FROM_BACKEND_EMAIL_LINK_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default emailLinkSentReducer;
