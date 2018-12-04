
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
    u2f_asking_description: false,
    u2f_token_description: '',
    u2f_failed: false,
    u2f_is_enrolled: false,
    u2f_request: {},
    u2f_token_remove: '',
    u2f_token_verify: ''
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
    case actions.START_U2F_REGISTRATION:
      return {
        ...state,
        u2f_failed: false,
        u2f_token_description: action.payload.description
      };
    case actions.STOP_U2F_REGISTRATION:
      return {
        ...state,
        u2f_is_enrolled: false,
        u2f_failed: false
      };
    case actions.START_ASK_U2F_DESCRIPTION:
      return {
        ...state,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_asking_description: true
      };
    case actions.STOP_ASK_U2F_DESCRIPTION:
      return {
        ...state,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_asking_description: false
      };
    case actions.GET_U2F_ENROLL_FAIL:
      return {
        ...state,
        u2f_failed: true,
        u2f_is_enrolled: false,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.GET_U2F_ENROLL_SUCCESS:
      action.payload.registerRequests.forEach(function (rr) {
          rr.appId = action.payload.appId;
      });
      return {
        ...state,
        u2f_failed: false,
        u2f_is_enrolled: true,
        u2f_request: action.payload
      };
    case actions.GET_U2F_REGISTER_FAIL:
      return {
        ...state,
        u2f_failed: true,
        u2f_is_enrolled: false,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.POST_U2F_BIND_SUCCESS:
      return {
        ...state,
        ...action.payload,
        u2f_failed: false,
        u2f_is_enrolled: false,
      };
    case actions.POST_U2F_REMOVE:
      return {
        ...state,
        u2f_token_remove: action.payload.token,
        u2f_failed: false,
        u2f_is_enrolled: false,
      };
    case actions.POST_U2F_REMOVE_FAIL:
      return {
        ...state,
        u2f_failed: true,
        u2f_is_enrolled: false,
      };
    case actions.POST_U2F_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        u2f_failed: false,
        u2f_is_enrolled: false,
      };
    case actions.POST_U2F_VERIFY:
      return {
        ...state,
        u2f_token_verify: action.payload.token,
        u2f_failed: false,
        u2f_is_enrolled: false,
      };
    case actions.POST_U2F_VERIFY_FAIL:
      return {
        ...state,
        u2f_failed: true,
        u2f_is_enrolled: false,
      };
    default:
      return state;
  }
};
export default securityReducer;
