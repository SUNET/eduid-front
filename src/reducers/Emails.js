
import * as actions from "actions/Emails";


const emailsData = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
    confirming: '',
    emails: [],
    email: '',
    code: '',
};


let emailsReducer = (state=emailsData, action) => {
  switch (action.type) {
    case actions.GET_EMAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.CHANGE_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL:
      return {
        ...state,
        is_fetching: true
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false

      };
    case actions.POST_EMAIL_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.email,
        is_fetching: true
      };
    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: '',
        is_fetching: false,
        failed: false,
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: ''
        },
      };
    case actions.START_RESEND_EMAIL_CODE:
      return {
        ...state,
        resending: {
          is_fetching: true,
          failed: false,
          error: {},
          message: ''
        }
      };
    case actions.START_RESEND_EMAIL_CODE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        resending: {
          is_fetching: false,
          failed: false,
          error: {},
          message: 'emails.resend_success'
        }
      };
    case actions.START_RESEND_EMAIL_CODE_FAIL:
      return {
        ...state,
        resending: {
          is_fetching: false,
          failed: true,
          error: action.payload.error,
          message: ''
        }
      };
    case actions.START_VERIFY:
        return {
          ...state,
          code: action.payload.code,
          is_fetching: true
        };
    case actions.POST_EMAIL_VERIFY_SUCCESS:
      return {
          ...state,
          is_fetching: false,
          emails: action.payload.emails
      }
    case actions.POST_EMAIL_VERIFY_FAIL:
      return {
          ...state,
          ...state.payload,
          is_fetching: false,
          resending: {
              is_fetching: false,
              failed: true
            },
      };
    case actions.START_VERIFY_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,

      };
    case actions.POST_EMAIL_REMOVE:
      return {
        ...state,
        email: action.payload.email,
        is_fetching: true
      };
    case actions.POST_EMAIL_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_EMAIL_REMOVE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case actions.POST_EMAIL_PRIMARY:
      return {
        ...state,
        email: action.payload.email,
        is_fetching: true
      }
    case actions.POST_EMAIL_PRIMARY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.POST_EMAIL_PRIMARY_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    case "@@redux-form/CHANGE":
      const form = {};
      if (action.meta.form === 'emails' && action.meta.field === 'email') {
          form.email = action.payload;
      }
      return {
        ...state,
        ...form
      };
    default:
      return state;
  }
};
export default emailsReducer;

