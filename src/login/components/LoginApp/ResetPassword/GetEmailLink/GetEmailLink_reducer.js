import * as actions from "./GetEmailLink_actions";

// see the config params in eduid-developer/etcd/conf.yaml
const getEmailLinkData = {
  email: "",
  email_sent: false
};

let getEmailLinkReducer = (state = getEmailLinkData, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return {
        ...state,
        ...action.payload,
      };
    case actions.FROM_BACKEND_EMAIL_SUCCESS:
      return {
        ...state,
        email_sent: true
      };
    default:
      return state;
  }
};

export default getEmailLinkReducer;
