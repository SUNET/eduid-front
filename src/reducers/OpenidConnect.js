
import * as actions from "actions/OpenidConnect";


const openidData = {
    failed: false,
    error: "",
    // as default, a gif with a single pixel.
    qr_img: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    qr_code: "",
    nin: "",
    showModal: false,
};


let openidConnectReducer = (state=openidData, action) => {
  switch (action.type) {
    case actions.POST_OIDC_PROOFING_PROOFING:
      return {
        ...state,
        failed: false,
        nin: action.payload.nin
      };
    case actions.POST_OIDC_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        qr_img: action.payload.qr_img,
        qr_code: action.payload.qr_code,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        failed: true,
        error: true,
        message: action.payload.message
      };
    case actions.SHOW_OIDC_SELEG_MODAL:
      return {
        ...state,
        showModal: true
      };
    case actions.HIDE_OIDC_SELEG_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default openidConnectReducer;

