import * as actions from "../actions/addPhoneNumbersActions";

const mobileData = {
  message: "",
  confirming: "",
  phones: [],
  phone: "",
  code: ""
};

let addPhoneNumbersReducer = (state = mobileData, action) => {
  switch (action.type) {
    case actions.GET_MOBILES_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_MOBILE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.phone
      };

    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: "",
      };
    case actions.START_RESEND_MOBILE_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.START_VERIFY:
      return {
        ...state,
        code: action.payload.code
      };

    case actions.POST_PHONE_VERIFY_SUCCESS:
      return {
        ...state,
        ...state.payload,
        phones: action.payload.phones
      };
    case actions.POST_MOBILE_REMOVE:
      return {
        ...state,
        phone: action.payload.phone
      };
    case actions.POST_PHONE_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_MOBILE_PRIMARY:
      return {
        ...state,
        phone: action.payload.phone
      };
    case actions.POST_MOBILE_PRIMARY_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case "@@redux-form/CHANGE":
      const form = {};
      if (action.meta.form === "phones" && action.meta.field === "number") {
        form.phone = action.payload;
      }
      return {
        ...state,
        ...form
      };
    default:
      return state;
  }
};
export default addPhoneNumbersReducer;
