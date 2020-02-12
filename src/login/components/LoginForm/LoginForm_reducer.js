import * as actions from "./LoginForm_actions";

// see the config params in eduid-developer/etcd/conf.yaml
const loginData = {
  email: "",
  password: "",
  // debug: state.config.debug
  // buttonDisabled: true
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
    //     ...state,
    //     ...action.payload
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
    case "@@redux-form/CHANGE":
      const form = {};
      // console.log("this is action.meta.form:", action.meta.form);
      // console.log("this is action.meta.field:", action.meta.field);
      if (action.meta.form === "emails" && action.meta.field === "email") {
        console.log("this is form.email:", form.email);
        form.email = action.payload;
      }
      return {
        ...state,
        ...form
      };
    default:
      return state;
  }
};

export default loginReducer;
