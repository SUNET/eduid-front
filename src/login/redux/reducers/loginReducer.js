/* eslint-disable */
import * as onLoadActions from "../actions/addDataToStoreActions";
import * as nextPageActions from "../actions/postRefLoginActions";
import * as usernamePasswordActions from "../actions/postUsernamePasswordActions";
import * as updatedTouAcceptActions from "../actions/postUpdatedTouAcceptActions";
import * as postRefForWebauthnChallengeActions from "../actions/postRefForWebauthnChallengeActions";
import * as postWebauthnToAuthenticatorActions from "../actions/postWebauthnToAuthenticatorActions";

const loginData = {
  ref: null,
  next_page: null,
  post_to: null,
  mfa: {
    webauthn_challenge: null,
    webauthn_assertion: null,
  },
  tou: {},
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
    case nextPageActions.NEXT_MOCK_URL_FINISHED:
      return {
        ...state,
        next_page: "FINISHED",
      };
    case usernamePasswordActions.POST_IDP_PW_AUTH_SUCCESS:
      return {
        ...state,
      };
    case updatedTouAcceptActions.POST_IDP_TOU_SUCCESS:
      return {
        ...state,
        tou: {
          ...state.tou,
          version: action.payload.version,
        },
      };
    case postRefForWebauthnChallengeActions.POST_IDP_MFA_AUTH_SUCCESS:
      return {
        ...state,
        mfa: {
          ...state.mfa,
          webauthn_challenge: action.payload.webauthn_options,
        },
      };
    case postWebauthnToAuthenticatorActions.POST_WEBAUTHN_ASSERTION:
      return {
        ...state,
        mfa: {
          ...state.mfa,
          webauthn_assertion: action.payload.assertion,
        },
      };

    default:
      return state;
  }
};

export default loginReducer;
