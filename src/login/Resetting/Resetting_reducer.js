import * as actions from "login/Resetting/Resetting_actions";

const resettingData = {
  choose_extrasec: "",
  extrasec_phone_index: -1
};

let resettingReducer = (state = resettingData, action) => {
  switch (action.type) {
    case actions.CHOOSE_EXTRA_SECURITY_PHONE:
      return {
        ...state,
        choose_extrasec: "phone",
        extrasec_phone_index: action.payload.index
      };
    case actions.CHOOSE_EXTRA_SECURITY_TOKEN:
      return {
        ...state,
        choose_extrasec: "token"
      };
    case actions.CHOOSE_EXTRA_SECURITY_NONE:
      return {
        ...state,
        choose_extrasec: "none"
      };
    default:
      return state;
  }
};

export default resettingReducer;
