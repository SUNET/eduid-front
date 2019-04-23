
import * as actions from "actions/AccountLinking";


const accountLinkingState = {
  failed: false,
  error: '',
  message: '',
  orcid: null
};


let accountLinkingReducer = (state=accountLinkingState, action) => {
  switch (action.type) {
    case actions.GET_ORCID:
      return {
        ...state,
      };
    case actions.GET_PERSONAL_DATA_ORCID_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.GET_ORCID_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.GET_ORCID_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.POST_ORCID_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        orcid: {},
      };
    case actions.POST_ORCID_REMOVE_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default accountLinkingReducer;
