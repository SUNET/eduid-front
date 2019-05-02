import * as actions from "actions/LookupMobileProofing";

const lookupMobileData = {
  failed: false,
  error: ""
};

let lookupMobileProofingReducer = (state = lookupMobileData, action) => {
  switch (action.type) {
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
