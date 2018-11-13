
import * as actions from "actions/AccountLinking";


const accountLinkingState = {
  is_fetching: false,
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
        is_fetching: true
      };
    case actions.GET_PERSONAL_DATA_ORCID_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_ORCID_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_ORCID_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.GET_ORCID_CONNECT:
      return {
        ...state,
        is_fetching: true
      };
    case actions.POST_ORCID_REMOVE:
      return {
        ...state,
        is_fetching: true
      };
    case actions.POST_ORCID_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        orcid: {},
        is_fetching: false
      };
    case actions.POST_ORCID_REMOVE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default accountLinkingReducer;
