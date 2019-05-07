import * as actions from "actions/Captcha";

// see the config params in eduid-developer/etcd/conf.yaml
const captchaData = {
  captcha_verification: ""
};

let captchaReducer = (state = captchaData, action) => {
  switch (action.type) {
    case actions.CAPTCHA_VERIFICATION:
      return {
        ...state,
        captcha_verification: action.payload.response
      };
    default:
      return state;
  }
};

export default captchaReducer;
