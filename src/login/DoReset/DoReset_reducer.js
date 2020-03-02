import * as actions from "login/DoReset/DoReset_actions";


const doResetData = {
  new_password: '',
  sms_code: '',
  password_chosen_sms: false,
  webauthn_assertion: null,
};

let doResetReducer = (state = doResetData, action) => {
  switch (action.type) {
    case actions.PASSWORD_TO_RESET:
      return {
        ...state,
        ...action.payload,
      };
    case actions.ASK_FOR_SMS_CODE:
      return {
        ...state,
        password_chosen_sms: true,
      };
    case actions.STOP_RESET_PASSWORD_SMS:
      return {
        ...state,
        password_chosen_sms: false,
      };
    case actions.DO_RESET_PASSWORD_SMS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.WEBAUTHN_CREDS_GOT:
      return {
        ...state,
        webauthn_assertion: action.payload
      };
    default:
      return state;
  }
};

export default doResetReducer;
