
import * as actions from "actions/CodeVerified";

// see the config params in eduid-developer/etcd/conf.yaml
const verifiedData = {
    password: '',
    eppn: '',
    nonce: '',
    timestamp: '',
    auth_token: '',
    email: '',
    status: '',
    dashboard_url: ''
};

let verifiedReducer = (state=verifiedData, action) => {
  switch (action.type) {
    case actions.GET_SIGNUP_VERIFY_LINK_SUCCESS:
      return {
          ...state, 
          ...action.payload
      };
    default:
      return state;
  }
};

export default verifiedReducer;
