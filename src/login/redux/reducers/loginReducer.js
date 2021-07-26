/* eslint-disable */
import * as onLoadActions from "../actions/addDataToStoreActions";
import * as nextPageActions from "../actions/postRefLoginActions";
import * as usernamePasswordActions from "../actions/postUsernamePasswordActions";
import * as addDataToStoreActions from "../actions/addDataToStoreActions";
import * as updatedTouAcceptActions from "../actions/postUpdatedTouAcceptActions";
import * as postRefForWebauthnChallengeActions from "../actions/postRefForWebauthnChallengeActions";
import * as postWebauthnFromAuthenticatorActions from "../actions/postWebauthnFromAuthenticatorActions";

const loginData = {
  ref: null,
  next_page: null,
  post_to: null,
  mfa: {
    webauthn_challenge: null,
    webauthn_assertion: null,
    parameters: null,
  },
  tou: {
    available_versions: null,
    version: null,
  },
};

let loginReducer = (state = loginData, action) => {
  switch (action.type) {
    case onLoadActions.ADD_LOGIN_REF_TO_STORE:
      return {
        ...state,
        ref: action.payload.ref,
      };
    case nextPageActions.POST_IDP_NEXT_SUCCESS:
      const samlParameters =
        action.payload.action === "FINISHED" ? action.payload.parameters : null;
      return {
        ...state,
        next_page: action.payload.action,
        post_to: action.payload.target,
        mfa: {
          ...state.mfa,
          parameters: samlParameters,
        },
      };
    case usernamePasswordActions.POST_IDP_PW_AUTH_SUCCESS:
      return {
        ...state,
      };
    case addDataToStoreActions.ADD_TOU_VERSIONS_TO_STORE:
      return {
        ...state,
        tou: {
          ...state.tou,
          available_versions: action.payload.touVersions,
        },
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
      console.log("challenge", action.payload.webauthn_options);
      return {
        ...state,
        mfa: {
          ...state.mfa,
          webauthn_challenge: action.payload.webauthn_options,
        },
      };
    case onLoadActions.ADD_WEBAUTHN_ASSERTION_TO_STORE:
      return {
        ...state,
        mfa: {
          ...state.mfa,
          webauthn_assertion: action.payload.webauthnAssertion,
        },
      };
    case postWebauthnFromAuthenticatorActions.POST_WEBAUTHN_ASSERTION:
      return {
        ...state,
        //   mfa: {
        //     ...state.mfa,
        //     webauthn_assertion: action.payload.assertion,
        //   },
      };
    default:
      return state;
  }
};

export default loginReducer;
