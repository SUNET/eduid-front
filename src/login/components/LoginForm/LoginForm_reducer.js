import * as actions from "./LoginForm_actions";

// see the config params in eduid-developer/etcd/conf.yaml
const loginData = {
  email: "",
  password: ""
  // valid: false
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    // case actions.VALIDATE:
    //   return {
    //     ...state
    //   };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        email_sent: true
      };
    // case actions.REJECT_TOU:
    //   return {
    //     ...state,
    //     tou_accepted: false,
    //     acceptingTOU: false
    //   };
    default:
      return state;
  }
};

export default loginReducer;
