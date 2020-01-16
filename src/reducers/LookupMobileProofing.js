import * as actions from "actions/LookupMobileProofing";

const lookupMobileData = {
  showModal: false,
  // verifyingMobile: false,
  // code: "",
  // code_sent: "",
  // letter_expires: "",
  // letter_expired: false,
  message: ""
};

let lookupMobileProofingReducer = (state = lookupMobileData, action) => {
  switch (action.type) {
    case actions.SHOW_MOBILE_MODAL:
      return {
        ...state,
        showModal: true
      };
    case actions.CLOSE_MOBILE_MODAL:
      return {
        ...state,
        showModal: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default lookupMobileProofingReducer;
