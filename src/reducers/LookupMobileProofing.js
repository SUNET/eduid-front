
import * as actions from "actions/LookupMobileProofing";


const lookupMobileData = {
    is_fetching: false,
    failed: false,
    error: "",
};


let lookupMobileProofingReducer = (state=lookupMobileData, action) => {
  switch (action.type) {
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_LOOKUP_MOBILE_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.message
      };
    default:
      return state;
  }
};

export default lookupMobileProofingReducer;


