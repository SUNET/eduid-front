/* eslint-disable */
import * as onLoadActions from "../actions/addDataToStoreActions";
import * as nextPageActions from "../actions/postRefLoginActions";
import * as usernamePasswordActions from "../actions/postUsernamePasswordActions";
import * as updatedTouAcceptActions from "../actions/postUpdatedTouAcceptActions";

const loginData = {
  ref: null,
  next_page: null,
  post_to: null,
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case onLoadActions.ADD_LOGIN_REF_TO_STORE:
      return {
        ...state,
        ref: action.payload.ref,
      };
    case nextPageActions.POST_IDP_NEXT_SUCCESS:
      return {
        ...state,
        next_page: "USERNAMEPASSWORD",
        // next_page: action.payload.action,
        // post_to: action.payload.target,
      };
    case nextPageActions.NEXT_MOCK_URL_TOU:
      return {
        ...state,
        next_page: "TOU",
      };
    case nextPageActions.NEXT_MOCK_URL_MFA:
      return {
        ...state,
        next_page: "MFA",
      };
    case usernamePasswordActions.POST_IDP_PW_AUTH_SUCCESS:
      return {
        ...state,
      };
    case updatedTouAcceptActions.POST_IDP_TOU_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default loginReducer;
