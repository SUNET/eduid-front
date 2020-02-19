import * as actions from "./LoginForm_actions";

// see the config params in eduid-developer/etcd/conf.yaml
const loginData = {
  email: "",
  password: "",
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case actions.ADD_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        email_sent: true
      };
    default:
      return state;
  }
};

export default loginReducer;
