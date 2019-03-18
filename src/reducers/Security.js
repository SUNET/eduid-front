
import * as actions from "actions/Security";


const security = {
    failed: false,
    error: '',
    message: '',
    credentials: [],
    code: '',
    confirming_change: false,
    confirming_deletion: false,
    location: '',
    deleted: false,
    webauthn_asking_description: false,
    webauthn_token_description: '',
    webauthn_failed: false,
    webauthn_attestation: {},
    webauthn_token_remove: '',
    webauthn_token_verify: '',
    webauthn_authenticator: 'cross-platform'
};


let securityReducer = (state=security, action) => {
  switch (action.type) {
    case actions.GET_CREDENTIALS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.GET_CREDENTIALS_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: true
      };
    case actions.STOP_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: false
      };
    case actions.GET_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: false,
      };
    case actions.GET_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_DELETE_ACCOUNT:
      return {
        ...state,
        confirming_deletion: true
      };
    case actions.STOP_DELETE_ACCOUNT:
      return {
        ...state,
        confirming_deletion: false
      };
    case actions.POST_DELETE_ACCOUNT:
      return {
        ...state,
        failed: false,
        confirming_deletion: false
      };
    case actions.POST_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        confirming_deletion: false,
        failed: false,
        location: action.payload.location
      };
    case actions.POST_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.GET_DELETE_ACCOUNT:
      return {
        ...state,
        failed: false,
        confirming_deletion: false
      };
    case actions.GET_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        confirming_deletion: false,
        failed: false,
        deleted: true
      };
    case actions.GET_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_WEBAUTHN_REGISTRATION:
      return {
        ...state,
        webauthn_failed: false,
        webauthn_token_description: action.payload.description
      };
    case actions.START_ASK_WEBAUTHN_DESCRIPTION:
      return {
        ...state,
        webauthn_failed: false,
        webauthn_asking_description: true
      };
    case actions.STOP_ASK_WEBAUTHN_DESCRIPTION:
      return {
        ...state,
        webauthn_failed: false,
        webauthn_asking_description: false
      };
    case actions.POST_WEBAUTHN_BEGIN_FAIL:
      return {
        ...state,
        webauthn_failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.POST_WEBAUTHN_BEGIN_SUCCESS:
      return {
        ...state,
        webauthn_failed: false,
        webauthn_attestation: action.payload.attestation
      };
    case actions.POST_WEBAUTHN_REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        webauthn_failed: false,
        webauthn_begun: false,
        webauthn_is_fetching: false,
        is_fetching: false
      };
    case actions.POST_WEBAUTHN_REGISTER_FAIL:
      return {
        ...state,
        ...action.payload,
        webauthn_failed: true,
        webauthn_begun: false,
        webauthn_is_fetching: false,
        is_fetching: false
      };
    case actions.POST_WEBAUTHN_REMOVE:
      return {
        ...state,
        webauthn_token_remove: action.payload.token,
        webauthn_failed: false,
      };
    case actions.POST_WEBAUTHN_REMOVE_FAIL:
      return {
        ...state,
        webauthn_failed: true,
      };
    case actions.POST_WEBAUTHN_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        webauthn_failed: false,
      };
    case actions.POST_WEBAUTHN_VERIFY:
      return {
        ...state,
        webauthn_token_verify: action.payload.token,
        webauthn_failed: false,
      };
    case actions.POST_WEBAUTHN_VERIFY_FAIL:
      return {
        ...state,
        webauthn_failed: true,
      };
    case actions.AUTHENTICATOR:
      return {
        ...state,
        webauthn_authenticator: action.payload.choice,
      };
    default:
      return state;
  }
};
export default securityReducer;
