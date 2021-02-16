import * as actions from "actions/Captcha";

// see the config params in eduid-developer/etcd/conf.yaml
const captchaData = {
  captcha_verification: "",
  disabledButton: false
};

let captchaReducer = (state = captchaData, action) => {
  switch (action.type) {
    case actions.CAPTCHA_VERIFICATION:
      return {
        ...state,
        captcha_verification: action.payload.response
      };
    case actions.POST_SIGNUP_TRYCAPTCHA:
      return {
        ...state,
        disabledButton: true
      };
    case actions.POST_SIGNUP_TRYCAPTCHA_FAIL:
      return {
        ...state,
        disabledButton: false
      };
    default:
      return state;
  }
};

export default captchaReducer;
