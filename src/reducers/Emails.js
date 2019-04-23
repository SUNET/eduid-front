
import * as actions from "actions/Emails";


const emailsData = {
    failed: false,
    error: '',
    message: '',
    resending: {
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
      };
    case actions.CHANGE_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL:
      return {
        ...state,
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,

      };
    case actions.POST_EMAIL_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.email,
      };
    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: '',
        failed: false,
        resending: {
          failed: false,
          error: {},
          message: ''
        },
      };
    case actions.START_RESEND_EMAIL_CODE:
      return {
        ...state,
        resending: {
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
          failed: false,
          error: {},
          message: 'emails.resend_success'
        }
      };
    case actions.START_RESEND_EMAIL_CODE_FAIL:
      return {
        ...state,
        resending: {
          failed: true,
          error: action.payload.error,
          message: ''
        }
      };
    case actions.START_VERIFY:
        return {
          ...state,
          code: action.payload.code,
        };
    case actions.POST_EMAIL_VERIFY_SUCCESS:
      return {
          ...state,
          emails: action.payload.emails
      }
    case actions.POST_EMAIL_VERIFY_FAIL:
      return {
          ...state,
          ...state.payload,
          resending: {
              failed: true
            },
      };
    case actions.START_VERIFY_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,

      };
    case actions.POST_EMAIL_REMOVE:
      return {
        ...state,
        email: action.payload.email,
      };
    case actions.POST_EMAIL_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.POST_EMAIL_REMOVE_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.error,
      };
    case actions.POST_EMAIL_PRIMARY:
      return {
        ...state,
        email: action.payload.email,
      }
    case actions.POST_EMAIL_PRIMARY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case actions.POST_EMAIL_PRIMARY_FAIL:
      return {
        ...state,
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

