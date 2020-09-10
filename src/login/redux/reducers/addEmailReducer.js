import * as actions from "../actions/addEmailActions";

// see the config params in eduid-developer/etcd/conf.yaml
const emailData = {
  email: "",
  acceptingTOU: false,
  tou_accepted: false
};

let emailReducer = (state = emailData, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return {
        ...state,
        ...action.payload,
        acceptingTOU: true
      };
    case actions.ACCEPT_TOU:
      return {
        ...state,
        tou_accepted: true,
        acceptingTOU: false
      };
    case actions.REJECT_TOU:
      return {
        ...state,
        tou_accepted: false,
        acceptingTOU: false
      };
    default:
      return state;
  }
};

export default emailReducer;
