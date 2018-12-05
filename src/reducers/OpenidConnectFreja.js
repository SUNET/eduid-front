
import * as actions from "actions/OpenidConnectFreja";


const openidFrejaData = {
  failed: false,
  error: null,
  iaRequestData: "",
  showModal: false,
  nin: "",
};

let openidConnectFrejaReducer = (state=openidFrejaData, action) => {
  switch (action.type) {
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING:
      return {
        ...state,
        failed: false
      };
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS:
      return {
        ...state,
        failed: false,
        iaRequestData: action.payload.iaRequestData,
      };
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        error: true,
        message: action.payload.message
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING:
      return {
        ...state,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS:
      return {
        ...state,
        failed: false,
        iaRequestData: action.payload.iaRequestData,
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        error: true,
        message: action.payload.message
      };
    case actions.SHOW_OIDC_FREJA_MODAL:
      return {
        ...state,
        failed: false
      };
    case actions.SHOW_OIDC_FREJA_MODAL_SUCCESS:
      return {
        ...state,
        nin: action.payload.nin,
        error: null,
        showModal: true,
      };
    case actions.SHOW_OIDC_FREJA_MODAL_FAIL:
      return {
        ...state,
        failed: true,
        error: true,
        message: action.payload.message
      };
    case actions.HIDE_OIDC_FREJA_MODAL:
      return {
        ...state,
      };
    case actions.HIDE_OIDC_FREJA_MODAL_SUCCESS:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default openidConnectFrejaReducer;

