import * as actions from "actions/CodeVerified";

// see the config params in eduid-developer/etcd/conf.yaml
const verifiedData = {
  password: "",
  email: "",
  status: "",
};

let verifiedReducer = (state = verifiedData, action) => {
  switch (action.type) {
    case actions.GET_SIGNUP_VERIFY_LINK_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default verifiedReducer;
