import * as actions from "actions/LookupMobileProofing";

const lookupMobileData = {
  showModal: false,
  // verifyingMobile: false,
  // code: "",
  // code_sent: "",
  // letter_expires: "",
  // letter_expired: false,
  failed: false,
  error: "",
  message: ""
};

let lookupMobileProofingReducer = (state = lookupMobileData, action) => {
  switch (action.type) {
    case actions.SHOW_MOBILE_MODAL:
      return {
        ...state,
        failed: false,
        showModal: true
      };
    case actions.CLOSE_MOBILE_MODAL:
      return {
        ...state,
        failed: false,
        showModal: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING:
      return {
        ...state,
        failed: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS:
      return {
        ...action.payload,
        failed: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.message
      };
    default:
      return state;
  }
};

export default lookupMobileProofingReducer;
